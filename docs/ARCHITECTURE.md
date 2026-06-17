# BestBridge — Architecture

> Final stack as of June 2026. Everything is consolidated on Cloudflare except outbound email (Resend) and the inbox (Zoho Mail).

---

## Stack overview

```
            ┌───────────────────────────────────────────────────────┐
            │                      Cloudflare                       │
            │                                                       │
[browser] ──→ DNS (anycast) ──→ Edge ──→ Universal SSL/TLS         │
            │                       │                              │
            │   bestbridge.cloud    │   www.bestbridge.cloud       │
            │   (apex)              │                              │
            │   ↓ Redirect Rule     │   ↓ Custom Domain → Worker   │
            │   301 → www           │                              │
            │                       │   ┌─────────────────────┐    │
            │                       │   │ Cloudflare Worker   │    │
            │                       └──→│ bestbridge          │    │
            │                           │ (Next.js 15 +       │    │
            │                           │  OpenNext adapter)  │    │
            │                           └─────────┬───────────┘    │
            └─────────────────────────────────────┼────────────────┘
                                                  │ (server action)
                                                  ↓
                                          ┌───────────────┐
                                          │   Resend API  │
                                          │  send mail    │
                                          └───────┬───────┘
                                                  │
                       noreply@bestbridge.cloud   │ → info@bestbridge.cloud
                                                  ↓
                                          ┌───────────────┐
                                          │  Zoho Mail    │
                                          │  inbox (web)  │
                                          └───────────────┘
```

| Layer | Provider | Cost | Notes |
|---|---|---|---|
| Domain registrar | Cloudflare Registrar | ~$15/yr | Migrated from Namecheap |
| DNS hosting | Cloudflare | $0 | Anycast, global |
| CDN | Cloudflare | $0 | Proxy enabled for `www` and apex |
| SSL/TLS | Cloudflare Universal SSL | $0 | Auto-renews |
| Hosting (Next.js) | Cloudflare Workers | $0 | Free tier: 100K requests/day |
| Apex → www redirect | Cloudflare Redirect Rule | $0 | "Redirect from root to WWW" template |
| Transactional email | Resend | $0 | Free tier: 3K emails/mo, 100/day |
| Inbox `info@bestbridge.cloud` | Zoho Mail Forever Free | $0 | 5 users, 5 GB each, webmail only |
| **Total recurring** | | **~$15/yr** | |

---

## Build & deploy

GitHub-driven, fully automatic.

1. Push to `main` on `Sarahint/bestbridge`
2. Cloudflare's GitHub integration detects the push
3. Runs `npm install` then `npm run cf:build`
   - `cf:build` invokes `opennextjs-cloudflare build`
   - Which runs `next build` (Next.js production build)
   - Then bundles the result into `.open-next/worker.js` + `.open-next/assets/`
4. Runs `npx wrangler deploy`
   - Reads `wrangler.jsonc`
   - Uploads worker code and static assets to Cloudflare
5. Live within 60–90 seconds of the push

No Docker. No standalone Node server. The Next.js app runs as a Cloudflare Worker with static assets served from the asset binding.

### Manual deploy (rare)

```bash
npm run cf:build         # just build
npm run cf:preview       # build + run wrangler dev locally
npm run cf:deploy        # build + deploy to Cloudflare (bypasses CI)
```

---

## Environment variables

Set in Cloudflare Worker → Settings → Variables and secrets:

| Variable | Type | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Secret (rotate periodically) | Authenticates Resend API calls |
| `RESEND_FROM_EMAIL` | Plain | Sender — must be a verified Resend domain (currently `noreply@bestbridge.cloud`) |
| `RESEND_TO_EMAIL` | Plain | Recipient for contact form submissions (currently `info@bestbridge.cloud`) |
| `NEXT_PUBLIC_GTM_ID` | Plain (optional) | Google Tag Manager container ID |
| `NEXT_PUBLIC_GA_ID` | Plain (optional) | GA4 measurement ID |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Plain (optional) | Google Search Console verification token |

For local development: copy values into a `.dev.vars` file (gitignored).

---

## DNS records (Cloudflare-managed)

### Web traffic (proxied through Cloudflare)
| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `bestbridge.cloud` | Cloudflare anycast (redirect rule handles it) | 🟠 |
| (auto, set by Worker custom domain) | `www.bestbridge.cloud` | Worker route | 🟠 |

### Mail (DNS-only)
| Type | Name | Value | Purpose |
|---|---|---|---|
| MX | `bestbridge.cloud` | `mx.zoho.com` p=10 | Zoho inbox |
| MX | `bestbridge.cloud` | `mx2.zoho.com` p=20 | Zoho inbox |
| MX | `bestbridge.cloud` | `mx3.zoho.com` p=50 | Zoho inbox |
| TXT | `bestbridge.cloud` | `v=spf1 include:zohomail.com include:amazonses.com ~all` | SPF (Zoho + Resend) |
| TXT | `_dmarc.bestbridge.cloud` | `v=DMARC1; p=none; aspf=r; adkim=r;` | DMARC monitor mode |
| TXT | `bestbridge.cloud` | `zoho-verification=zb…` | Zoho domain verification |
| TXT | `zmail._domainkey.bestbridge.cloud` | (DKIM public key) | Zoho DKIM |
| TXT | `resend._domainkey.bestbridge.cloud` | (DKIM public key) | Resend DKIM |
| MX | `send.bestbridge.cloud` | `feedback-smtp.ap-southeast-1.amazonses.com` p=10 | Resend bounce path |
| TXT | `send.bestbridge.cloud` | `v=spf1 include:amazonses.com ~all` | Resend subdomain SPF |

---

## Security posture

| Feature | Status | Where configured |
|---|---|---|
| HTTPS forced | ✅ | Cloudflare SSL/TLS → Always Use HTTPS |
| HSTS | ✅ 6 months, includeSubdomains, preload | Cloudflare SSL/TLS → HSTS |
| Min TLS version | TLS 1.2 (recommended) | Cloudflare SSL/TLS → Edge Certificates |
| X-Content-Type-Options | `nosniff` | `next.config.ts` headers |
| X-Frame-Options | `SAMEORIGIN` | `next.config.ts` headers |
| Referrer-Policy | `strict-origin-when-cross-origin` | `next.config.ts` headers |
| Permissions-Policy | camera/mic/geolocation denied | `next.config.ts` headers |
| Bot protection | Bot Fight Mode | Cloudflare Security |
| DDoS protection | Default Cloudflare | Cloudflare Security |
| Honeypot on contact form | ✅ | `lib/schemas/booking.ts` `honeypot` field |
| Zod input validation | ✅ | `lib/schemas/booking.ts` |
| SPF + DKIM + DMARC | ✅ all aligned | DNS |

---

## Key files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root metadata, JSON-LD (Org + LocalBusiness), skip link |
| `app/(marketing)/page.tsx` etc. | Home / Services / About / Contact pages |
| `app/sitemap.ts` | XML sitemap generator |
| `app/robots.ts` | robots.txt generator |
| `app/favicon.ico` + `icon.jpg` + `apple-icon.jpg` | Browser icons |
| `app/opengraph-image` | Removed (replaced by static `public/og-image.png`; OpenNext can't mix edge + node runtimes) |
| `lib/landing-content.ts` | All copy, FAQs, NAP, team data |
| `lib/seo/schemas.ts` | Reusable schema.org JSON-LD builders |
| `lib/schemas/booking.ts` | Zod validation for contact form |
| `lib/actions/contact.ts` | Server action — Resend API call + Zoho delivery |
| `components/seo/json-ld.tsx` | `<script type="application/ld+json">` helper |
| `components/landing/*.tsx` | All page-level components |
| `wrangler.jsonc` | Cloudflare Worker config (assets binding, nodejs_compat) |
| `open-next.config.ts` | OpenNext adapter config |
| `next.config.ts` | Next.js config — images.unoptimized, security headers |
| `docs/` | This file, migration playbook, SEO playbook |

---

## Rollback / disaster recovery

### If the Worker breaks after a deploy
1. Cloudflare → Workers & Pages → bestbridge → **Deployments**
2. Find the last known-good deployment
3. Click **⋯ menu** → **Rollback to this deployment**
4. Site is back in seconds — no rebuild needed

### If a future deploy fails to build
- GitHub integration retries automatically
- Previous deployment continues serving until the new one succeeds
- Zero downtime

### If Cloudflare itself has a regional outage
- Worker has 100+ PoPs globally; automatic failover within Cloudflare
- For total Cloudflare outage: there is no second host configured (intentional — adding multi-cloud complexity isn't worth it at this scale)

### If Resend has an outage
- Contact form returns "Failed to send" error to the user
- Server logs the actual Resend error in Cloudflare Worker logs
- Users can still reach you via the displayed `info@bestbridge.cloud` mailto links
- No retry queue currently — if you want one, add Cloudflare Durable Objects + a queue worker

### If Zoho Mail has an outage
- Inbound mail bounces or queues at sender's MTA
- Resend will surface delivery errors in their dashboard
- You'd notice from the lack of new inquiry emails

---

## Daily / weekly / quarterly maintenance

| Cadence | Task |
|---|---|
| Daily | (nothing) — fully autopilot |
| Weekly | Glance at Cloudflare Analytics (requests, bandwidth, errors) |
| Weekly | Glance at Resend dashboard (delivery rate, bounces) |
| Monthly | Check Google Search Console for crawl errors and search performance |
| Quarterly | Rotate `RESEND_API_KEY` (best practice) |
| Quarterly | Update npm dependencies: `npm outdated`, review changelogs, `npm update`, test, push |
| As needed | Tighten DMARC: `p=none` → `p=quarantine` → `p=reject` once you confirm Zoho + Resend both pass alignment for 30+ days |
