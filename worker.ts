// @ts-ignore
import worker from "./.open-next/worker";
import { getResend } from "./src/lib/resend";

export default {
  fetch: worker.fetch,

  async queue(batch: MessageBatch<any>, env: CloudflareEnv) {
    const resend = getResend(env);

    for (const msg of batch.messages) {
      try {
        const { type, payload } = msg.body;
        
        msg.ack();
      } catch (error) {
        console.error("❌ Queue processing failed:", error);
        msg.retry();
      }
    }
  },
};
