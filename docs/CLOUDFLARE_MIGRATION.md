# Cloudflare Migration Plan — bestbridge.cloud

> Move DNS, SSL, apex redirect, and email forwarding from SiteGround to the Cloudflare free tier.
> Keep: domain registration at Namecheap, hosting at Railway, transactional email sending at Resend.

---

## Why migrate?

| Capability | Current (SiteGround) | After (Cloudflare) | Win |
|---|---|---|---|
| DNS hosting | SiteGround | Cloudflare anycast | Faster lookups globally |
| Apex (`bestbridge.cloud`) SSL | Mismatched wildcard cert | Free Universal SSL covering apex + all subdomains | "Not Secure" gone, no SiteGround dependency |
| Apex → www redirect | SiteGround Nginx rule | Cloudflare Page Rule / Bulk Redirect | One less hop, one less vendor |
| `info@bestbridge.cloud` inbox | SiteGround mail server | **Zoho Mail** (free tier, custom domain) | Real mailbox at the domain, free for up to 5 users |
| CDN | None | Cloudflare global CDN | Faster image/CSS/JS for international visitors |
| DDoS protection | None | Cloudflare free DDoS + Bot Fight Mode | Free defense layer |
| Cost | SiteGround hosting fee (~$10–30/mo) | **$0** (Cloudflare free tier) | Save the SiteGround bill |
| Email sending | Resend (verified) | Resend (verified) | No change — keep what works |

**Total expected savings: ~$120–360/year** depending on SiteGround plan tier.

---

## Current state inventory

```
Namecheap (registrar)
  └─ Nameservers → ns1.siteground.net, ns2.siteground.net
       └─ SiteGround DNS Zone:
            ├─ A   bestbridge.cloud           → 35.213.138.181 (SiteGround server)
            ├─ A   ssh / mail / ftp / autoconfig / autodiscover  → 35.213.138.181
            ├─ CNAME www.bestbridge.cloud     → ld37efdq.up.railway.app  ← Railway site
            ├─ TXT  _railway-verify.www       → railway-verify=c4ef98…  ← Railway DNS proof
            ├─ MX   bestbridge.cloud          → mx10/20/30.antispam.mailspamprotection.com  ← Inbox
            ├─ TXT  bestbridge.cloud          → v=spf1 +a +mx include:…dnssmarthost.net  ← Inbox SPF
            ├─ CNAME default._domainkey       → …dkim.auto.dnssmarthost.net  ← Inbox DKIM
            ├─ TXT  _dmarc                    → v=DMARC1; p=none  ← Inbox DMARC
            ├─ MX   send.bestbridge.cloud     → feedback-smtp.ap-southeast-1.amazonses.com  ← Resend
            ├─ TXT  send.bestbridge.cloud     → v=spf1 include:amazonses.com ~all  ← Resend SPF
            └─ TXT  resend._domainkey         → p=MIGfMA…  ← Resend DKIM

       SiteGround Nginx redirect rule: bestbridge.cloud → https://www.bestbridge.cloud
       SiteGround WordPress install (unused — already decided to delete)
       SiteGround SSL cert (*.bestbridge.cloud wildcard, doesn't cover apex)
```

---

## Decisions to make BEFORE starting

### Decision 1 — Inbox provider: **Zoho Mail** ✅ (decided)

Zoho Mail Forever Free Plan supports custom domains and is the right choice for now.

| Zoho tier | Cost | Users | Storage | Access | Good for |
|---|---|---|---|---|---|
| **Forever Free** ✅ | **$0** | up to 5 | 5 GB / user | Web + mobile app (no IMAP/POP) | Starting out; no third-party desktop clients |
| **Mail Lite** | $1/user/mo | unlimited | 5–10 GB | Web + mobile + IMAP/POP | Once you want Apple Mail / Outlook |
| **Workplace Standard** | $3/user/mo | unlimited | 30 GB + 10 GB drive | Full Zoho Suite (Cliq, WorkDrive, Writer) | Team collaboration |

Start with **Forever Free**. Mail flows directly to Zoho via MX records (no Cloudflare Email Routing needed). You can upgrade later without disruption.

### Decision 2 — Move www proxy through Cloudflare?

- **Proxy ON (orange cloud)**: Cloudflare CDN + DDoS + WAF + analytics. Hides Railway origin IP.
- **Proxy OFF (gray cloud)**: Cloudflare is just DNS. Faster origin handoff, no CDN.

**Recommendation: Proxy ON** for `www.bestbridge.cloud`. Set Cloudflare SSL to **Full (Strict)** so Cloudflare verifies Railway's Let's Encrypt cert. Risk: a misconfigured proxy can briefly break the site, so test in incognito after switching.

### Decision 3 — Apex strategy

- Cloudflare Page Rule: `bestbridge.cloud/*` → `https://www.bestbridge.cloud/$1` (301)
- Cloudflare CNAME flattening on apex pointing to Railway (allows apex to serve the site directly without www)
- Bulk Redirect (newer Cloudflare feature, more flexible than Page Rules)

**Recommendation: Cloudflare Bulk Redirect** for apex → www. This is cleaner than a Page Rule and leaves the 3 free Page Rules available for other uses (e.g., cache rules).

---

## Migration phases

### Phase 1 — Cloudflare account & site setup (~20 min, low risk)

1. Sign up at https://dash.cloudflare.com → use a personal/business email (not `info@bestbridge.cloud` since we're about to migrate that).
2. **Add a site** → enter `bestbridge.cloud` → choose **Free** plan.
3. Cloudflare scans SiteGround DNS automatically. Review the imported records:
   - ✅ Keep: `A bestbridge.cloud → 35.213.138.181`, `CNAME www → ld37efdq.up.railway.app`, all Resend records (`send` + `resend._domainkey`), `_railway-verify`
   - ✅ Keep for now: all existing inbox MX/SPF/DKIM/DMARC records (we'll replace in Phase 5)
   - ⚠️ Audit: `A` records for `ssh`, `ftp`, `autoconfig`, `autodiscover`, `mail` — these were for SiteGround services. Delete any you don't use (most likely all of them once SiteGround is gone).
4. Cloudflare gives you 2 nameservers: `xxxxx.ns.cloudflare.com` and `yyyyy.ns.cloudflare.com`. **Copy these.** Don't continue past the wizard yet.

### Phase 2 — Pre-flight checks BEFORE switching nameservers (~10 min)

Critical: get the Cloudflare DNS records right before you flip nameservers, otherwise you take downtime.

1. In Cloudflare DNS dashboard, confirm:
   - **A** `bestbridge.cloud` → `35.213.138.181` — proxy status: 🟠 **Proxied** (orange cloud) — Cloudflare will handle the apex redirect (Phase 4)
   - **CNAME** `www` → `ld37efdq.up.railway.app` — proxy status: 🟠 **Proxied**
   - **TXT** `_railway-verify.www` → `railway-verify=c4ef98…` — proxy: ⚪ **DNS only** (TXT can't be proxied)
   - **MX** records (all of them) → proxy: ⚪ **DNS only** (mandatory; MX can never be proxied)
   - **TXT** records (SPF, DMARC, DKIM-related) → proxy: ⚪ **DNS only**
2. Set **SSL/TLS mode** in Cloudflare → SSL/TLS → Overview → **Full (Strict)**.
3. Set **Always Use HTTPS** → ON (SSL/TLS → Edge Certificates).
4. Set **Automatic HTTPS Rewrites** → ON.
5. Set **Minimum TLS Version** → 1.2.

### Phase 3 — Switch nameservers at Namecheap (~5 min flip, 1–48h propagation)

1. https://www.namecheap.com → Domain List → `bestbridge.cloud` → **Manage**.
2. **Nameservers** section → currently "Custom DNS" with SiteGround nameservers.
3. Replace with the 2 Cloudflare nameservers from Phase 1, save.
4. Cloudflare's overview page will show "Pending" until DNS propagates and Cloudflare verifies — usually 5–60 minutes, occasionally longer.
5. **DO NOT delete SiteGround DNS records yet** — until Cloudflare is verified, traffic is mixed.

### Phase 4 — Move apex redirect from SiteGround to Cloudflare (~10 min, after Phase 3 verified)

Once Cloudflare confirms "Active" status:

**Option A: Bulk Redirect (recommended)**
1. Cloudflare → **Rules** → **Redirect Rules** → **Create rule**.
2. Name: `Apex to www`.
3. When incoming requests match: `Hostname` equals `bestbridge.cloud`.
4. Then: URL redirect → Type **Static**, URL `https://www.bestbridge.cloud/${URI_PATH}`, Status **301**, Preserve query string **ON**.
5. Save.

**Option B: Page Rule** (older mechanism)
1. Cloudflare → **Rules** → **Page Rules** → **Create Page Rule**.
2. URL: `bestbridge.cloud/*`
3. Setting: Forwarding URL → 301 → `https://www.bestbridge.cloud/$1`
4. Save.

After either: change the A record `bestbridge.cloud` from `35.213.138.181` to point to Cloudflare-proxied (you can keep it pointing to the SG IP — the redirect rule intercepts before reaching origin). Once SiteGround is gone, point it to `192.0.2.1` (a documented black hole) and let Cloudflare's redirect rule do all the work.

### Phase 5 — Migrate `info@bestbridge.cloud` to Zoho Mail (~25 min)

⚠️ Do this only after Phase 3 verified. There will be a brief mail-delivery gap during the MX swap.

#### 5.1 — Sign up for Zoho Mail Forever Free
1. https://www.zoho.com/mail/zohomail-pricing.html → scroll down → **"Forever Free Plan" → Sign Up Now**.
2. Choose **"Sign up with a domain I already own"** → enter `bestbridge.cloud`.
3. Create your Zoho admin account (use a personal email, not `info@bestbridge.cloud` since that's the one you're setting up).

#### 5.2 — Verify domain ownership in Zoho
Zoho asks you to add one of:
- a CNAME record (e.g., `zb12345.bestbridge.cloud` → `zmverify.zoho.com`), OR
- a TXT record (e.g., `zoho-verification=zb12345.zmverify.zoho.com`), OR
- upload an HTML file to your site root.

Use the **TXT method** — easiest in Cloudflare DNS:
- Cloudflare DNS → Add record → Type **TXT**, Name `@` (root), Value `zoho-verification=...` (exact value from Zoho), Proxy ⚪ **DNS only**, Save.
- Wait 2–5 min → click **Verify** in Zoho.

#### 5.3 — Create the `info@bestbridge.cloud` mailbox in Zoho
Zoho's setup wizard:
1. Create user account with email address `info@bestbridge.cloud` + a strong password.
2. Optionally add other addresses now (e.g., `sarah@bestbridge.cloud`) — free tier allows up to 5.

#### 5.4 — Update MX records to Zoho
This is the cutover. Inbound mail flips from SiteGround to Zoho.

**In Cloudflare DNS, delete:**
- 3× `MX bestbridge.cloud → mx10/20/30.antispam.mailspamprotection.com` (old SiteGround inbox)
- `TXT bestbridge.cloud → v=spf1 +a +mx include:bestbridge.cloud.spf.auto.dnssmarthost.net …` (old inbox SPF)
- `CNAME default._domainkey.bestbridge.cloud → …dkim.auto.dnssmarthost.net` (old inbox DKIM)

**In Cloudflare DNS, add (per Zoho's setup screen):**
- `MX bestbridge.cloud → mx.zoho.com` priority **10**
- `MX bestbridge.cloud → mx2.zoho.com` priority **20`
- `MX bestbridge.cloud → mx3.zoho.com` priority **50**
- `TXT bestbridge.cloud → v=spf1 include:zoho.com include:amazonses.com ~all`
  - ⚠️ **Important**: this combined SPF covers BOTH Zoho (inbound mailbox) AND Resend (outbound transactional). Without `include:amazonses.com`, Resend emails will start failing SPF.
- DKIM: Zoho gives you a TXT for `zmail._domainkey` (or similar selector). Add it as Cloudflare DNS-only.

**Keep untouched** (Resend records, still needed for outbound):
- `MX send.bestbridge.cloud → feedback-smtp.ap-southeast-1.amazonses.com`
- `TXT send.bestbridge.cloud → v=spf1 include:amazonses.com ~all`
- `TXT resend._domainkey → p=MIGfMA…`
- `TXT _dmarc.bestbridge.cloud → v=DMARC1; p=none; …` (this still applies — DKIM checks against both Zoho's selector AND Resend's selector pass DMARC alignment)

#### 5.5 — Verify in Zoho and test
1. Back in Zoho setup → click **"Verify MX records"** → wait until green.
2. Send a test email from your phone (any external account) to `info@bestbridge.cloud`.
3. Log into https://mail.zoho.com → it should arrive within 30 sec.
4. Submit the contact form at https://www.bestbridge.cloud/contact → the inquiry email should also arrive in Zoho.

#### 5.6 — Set up "Send Mail As" (optional but recommended)
So you can reply *from* `info@bestbridge.cloud` directly in Zoho web/mobile (instead of from a generic address):
- This is built in. Zoho lets you compose new messages and reply from the mailbox address natively.
- If you want to *also* use this address from another client (Gmail, Outlook), the Free tier blocks IMAP/POP — you'd need Mail Lite ($1/user/mo).

### Phase 6 — Verify and harden (~20 min)

Run through the smoke-test checklist:

```
Site loads:
□ https://www.bestbridge.cloud → 200, valid cert, hero renders
□ https://bestbridge.cloud → 301 → https://www.bestbridge.cloud, no SSL warning
□ http://www.bestbridge.cloud → 301 → https://
□ http://bestbridge.cloud → 301 → https://www.bestbridge.cloud

Forms work:
□ Contact form submits → green success
□ Email arrives at the Gmail forwarding address

Email:
□ Send test from your phone to info@bestbridge.cloud → arrives in Zoho inbox (https://mail.zoho.com)
□ Reply to that test from Zoho → check the reply lands at the sender and From shows info@bestbridge.cloud
□ Open Zoho on mobile (Zoho Mail app) and confirm sync works

SEO / structured data still present:
□ curl https://www.bestbridge.cloud/sitemap.xml → 200 + valid XML
□ curl https://www.bestbridge.cloud/robots.txt → 200
□ /opengraph-image still loads
□ JSON-LD schemas still in the HTML
```

Harden Cloudflare:
- **Security → Bots → Bot Fight Mode** → ON (free, blocks obvious bots)
- **Security → Settings → Security Level** → Medium
- **Speed → Optimization → Brotli** → ON
- **Caching → Configuration → Browser Cache TTL** → 4 hours (good default)

### Phase 7 — Decommission SiteGround (~10 min, after 48h of verified Cloudflare working)

Wait at least 48 hours after Phase 6 to make sure DNS has fully propagated worldwide and no edge cases break.

1. Log in to SiteGround.
2. Verify nothing critical is still active there:
   - WordPress install — delete (already planned).
   - Mailboxes — make sure no IMAP client (phone, desktop) is still pulling mail from SiteGround. Inbound is forwarded to Gmail via Cloudflare now, but old IMAP connections will start failing.
   - Backups — download a full account backup before deleting (just in case).
3. Cancel SiteGround hosting plan. The domain itself stays at Namecheap, unaffected.

Estimated time-to-cancellation: 5 min in SiteGround dashboard, refund pro-rated depending on plan.

---

## Rollback plan (if something goes wrong)

| Failure | Symptom | Rollback |
|---|---|---|
| Site stops loading after nameserver flip | `www.bestbridge.cloud` returns DNS error or 5xx | Switch nameservers back to SiteGround in Namecheap; allow ~30 min to propagate |
| Apex redirect breaks | `bestbridge.cloud` shows Cloudflare error | Disable the Cloudflare Page Rule / Redirect Rule; the SiteGround redirect rule still exists if you haven't cancelled SiteGround yet |
| Email stops arriving | New inbound mail doesn't reach Zoho | Verify the 3 Zoho MX records in Cloudflare are correct, DNS-only (not proxied), and priorities are 10/20/50. Check Zoho mail logs (Admin → Mail Reports → Inbound). Worst case, re-add SiteGround MX records temporarily while you debug |
| Resend stops sending | Contact form returns "Failed to send" | Resend records (`send` + `resend._domainkey`) should be untouched. Verify in Cloudflare DNS panel they're still present |
| Mixed-content / SSL errors | Browser shows warnings | Cloudflare → SSL/TLS → Overview → verify mode is **Full (Strict)**, not Flexible (Flexible breaks redirects). Verify Railway origin cert is valid |

---

## Future enhancements (after migration stable)

Optional improvements that become possible once on Cloudflare:

1. **Cloudflare Workers** — run server-side code at the edge. Could replace the Resend server action with a Worker that proxies to Resend, eliminating one Railway request. Probably not worth it for current scale.
2. **Cloudflare Pages** — static hosting alternative to Railway. Free, but Next.js with server actions needs the Pages "edge" runtime which is more constrained. Not recommended for this site.
3. **Cloudflare Analytics** — replace/augment GA4 with privacy-friendly analytics. Free.
4. **Cloudflare Turnstile** — replace/augment the honeypot bot check on the contact form with Cloudflare's CAPTCHA alternative. Free.
5. **Cloudflare R2** — S3-compatible object storage. Useful if you ever add user-uploaded files (e.g., document uploads on the contact form).
6. **Cloudflare Zero Trust / Tunnels** — if you ever need to expose a private dev/staging environment. Free for up to 50 users.
7. **Transfer domain registration from Namecheap to Cloudflare Registrar** — Cloudflare offers at-cost registration (cheaper than Namecheap on most TLDs). Requires 60-day cooldown after last transfer. Plan for ~2026-08 if your last Namecheap transfer was 2026-06.

---

## Effort & timeline estimate

| Phase | Time | Risk |
|---|---|---|
| 1. Cloudflare site setup | 20 min | None |
| 2. DNS pre-flight checks | 10 min | None |
| 3. Nameserver switch + propagation wait | 5 min flip + 1–48h wait | Medium — keep SiteGround alive during wait |
| 4. Apex redirect rule | 10 min | Low |
| 5. Zoho Mail setup + MX cutover | 25 min | Medium — brief mail gap during MX swap; verify Resend still sends |
| 6. Verify & harden | 20 min | None |
| 7. Decommission SiteGround | 10 min | Low — wait 48h first |
| **Total active time** | **~90 min** | |
| **Total elapsed time** | **2–3 days** (waiting for propagation + safety windows) | |

---

## Open questions for you (to confirm before execution)

1. **Zoho admin account** — which personal email will you use as the Zoho admin login? (Not `info@bestbridge.cloud`, because that's the mailbox you're setting up.)
2. **Additional mailboxes** — besides `info@bestbridge.cloud`, do you want any other addresses up front (e.g., `sarah@`, `hello@`, `legal@`)? Free Zoho tier allows up to 5.
3. **Timeline** — execute all at once over a weekend, or roll out one phase per day?
4. **Subdomain cleanup** — confirm you don't use `mail.`, `ftp.`, `ssh.`, `autoconfig.`, `autodiscover.bestbridge.cloud` for anything (so we can delete those A records during migration)?
5. **Mail history** — do you have any historical mail in the SiteGround mailbox that should be exported (mbox/eml) and imported into Zoho before SiteGround is cancelled? If yes, we'll add an export step between Phase 5 and Phase 7.
