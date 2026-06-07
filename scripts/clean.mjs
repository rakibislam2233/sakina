import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const cleanAll = process.argv.includes('--all');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stopWranglerWorkers() {
  if (process.platform !== 'win32') return;

  try {
    execSync(
      'powershell -NoProfile -Command "Get-Process workerd -ErrorAction SilentlyContinue | Stop-Process -Force"',
      { stdio: 'ignore' },
    );
    console.log('Stopped wrangler/workerd preview processes.');
  } catch {
    // No workerd process running.
  }
}

function stopNextDevServers() {
  if (process.platform !== 'win32') return;

  const project = root.replace(/\\/g, '\\\\');
  try {
    execSync(
      `powershell -NoProfile -Command "$project='${project}'; Get-CimInstance Win32_Process -Filter \\"Name='node.exe'\\" | Where-Object { $_.CommandLine -like '*next dev*' -and $_.CommandLine -like \\"*$project*\\" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"`,
      { stdio: 'ignore' },
    );
    console.log('Stopped local next dev servers for this project.');
  } catch {
    // No matching dev server.
  }

  for (const port of [3000, 3001, 8787, 8788]) {
    try {
      execSync(
        `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`,
        { stdio: 'ignore' },
      );
    } catch {
      // Port not in use.
    }
  }
}

function removeDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  try {
    fs.rmSync(dirPath, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    return;
  } catch {
    // Windows often blocks deletes while wrangler/node still holds handles.
    const stalePath = `${dirPath}.stale.${Date.now()}`;
    fs.renameSync(dirPath, stalePath);
    fs.rmSync(stalePath, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}

async function removeDirWithRetry(dirPath, attempts = 6) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      removeDirSync(dirPath);
      return;
    } catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? error.code : null;
      if (attempt === attempts) throw error;
      if (code === 'EPERM' || code === 'EBUSY' || code === 'ENOTEMPTY') {
        console.warn(`Retrying cleanup for ${path.basename(dirPath)} (${attempt}/${attempts})...`);
        await sleep(400 * attempt);
        continue;
      }
      throw error;
    }
  }
}

async function main() {
  if (cleanAll) {
    stopWranglerWorkers();
    stopNextDevServers();
    await sleep(1200);
  }

  const targets = cleanAll ? ['.next', '.open-next'] : ['.next'];

  for (const target of targets) {
    const dirPath = path.join(root, target);
    if (!fs.existsSync(dirPath)) continue;
    console.log(`Cleaning ${target}...`);
    await removeDirWithRetry(dirPath);
  }

  // Remove leftover stale folders from previous Windows cleanups.
  for (const entry of fs.readdirSync(root)) {
    if (entry.startsWith('.open-next.stale.') || entry.startsWith('.next.stale.')) {
      await removeDirWithRetry(path.join(root, entry), 3);
    }
  }
}

main().catch((error) => {
  console.error('\nCleanup failed. Stop any running `next dev`, `npm run preview`, or wrangler processes, then retry.');
  console.error('Tip: close preview/dev terminals, or run `npm run clean:all` again after stopping them.\n');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
