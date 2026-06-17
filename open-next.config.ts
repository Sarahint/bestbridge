// OpenNext config for Cloudflare Workers/Pages.
// Docs: https://opennext.js.org/cloudflare/get-started
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // No incremental cache backing store yet — pages are statically rendered,
  // so the default no-op cache is fine for now. Add R2/KV here later for ISR.
});
