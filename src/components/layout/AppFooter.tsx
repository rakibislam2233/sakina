import { Moon, Heart } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="w-full border-t border-border bg-muted/80 py-8 mt-auto">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-twilight-glow" />
          <span className="font-serif text-xs text-muted-foreground tracking-wide">
            Sakina — Your journal for quiet reflection.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-sans text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>Made with care for peaceful hours</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400/20" />
          </div>
          <span className="text-border">|</span>
          <p className="font-mono">{new Date().getUTCFullYear()} Sakina</p>
        </div>
      </div>
    </footer>
  );
}
