# BestBridge — SEO / AEO / SEM Playbook

Step-by-step actions you (the owner) need to take off-site to convert the on-site improvements into actual rankings and leads. The code is done; this is what only a human can do.

---

## Phase 5A — Google Search Console (do today, 15 min)

1. Open https://search.google.com/search-console
2. Click **Add property** → **URL prefix** → enter `https://www.bestbridge.cloud`
3. Choose **HTML tag** verification → copy the `content="..."` token
4. In Railway dashboard → bestbridge service → **Variables**:
   - Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = the token (without quotes)
5. Wait 2–3 min for Railway to redeploy
6. Back in Search Console → click **Verify** ✅
7. **Submit sitemap**: left nav → Sitemaps → enter `sitemap.xml` → Submit
8. **Request indexing** for each URL (Search Console → URL inspection → paste each):
   - https://www.bestbridge.cloud/
   - https://www.bestbridge.cloud/services
   - https://www.bestbridge.cloud/about
   - https://www.bestbridge.cloud/contact

Expected: indexed pages > 0 within 1–7 days.

---

## Phase 5B — Bing Webmaster Tools (10 min)

1. https://www.bing.com/webmasters → Sign in with Microsoft account
2. **Import from Search Console** (one-click) — copies the property over
3. Submit `https://www.bestbridge.cloud/sitemap.xml`
4. Done. Bing + Yahoo + DuckDuckGo will start crawling.

---

## Phase 5C — Google Business Profile (CRITICAL for local search, 30 min + verification wait)

This is the single biggest off-site lever for **"visa consultant Bangkok"** style searches and Google Maps placement.

1. https://www.google.com/business → **Manage now**
2. **Business name**: BestBridge Consultancy
3. **Category** (primary): `Visa Consultant`
4. **Additional categories** (add all 3): `Legal Services`, `Business Management Consultant`, `Employment Agency`
5. **Address**: enter your real Bangkok street address. If you don't want it public, choose "I deliver goods and services to my customers" then specify service area = Thailand. **Note:** without a verified street address, you can't appear in the Maps pack — only in regular search.
6. **Phone**: +66 86 115 6922
7. **Website**: https://www.bestbridge.cloud
8. **Hours**: Mon–Fri 09:00–18:00
9. **Verification**: Google will send a postcard (5–14 days in TH) or sometimes offer phone/video verification. Complete it.
10. **After verification** — log back in and add:
    - **Description** (750 chars): Use the home page lede expanded
    - **Photos**: Add ≥ 8 (logo, team, office exterior, office interior, services photos)
    - **Services**: Add each service from `/services` page
    - **Posts**: Publish 1 update per week (a tip, a recent client outcome, etc.)
    - **Q&A**: Pre-seed 5 questions from `lib/landing-content.ts` `servicesPage.faqs` — answer them yourself

---

## Phase 5D — Initial backlink targets (90 min, gradual over 4 weeks)

Build credibility signals. Aim for **10 quality backlinks in the first 90 days**.

| Target | Cost | Effort | Why |
|---|---|---|---|
| **AmCham Thailand** (American Chamber) member directory | ~$1,200/yr membership | High | Highest-authority Thai business directory; massive trust signal |
| **BNI Bangkok chapter** | ~$1,000/yr | High | Networking + listed in BNI member profile |
| **InterNations Bangkok** business listings | Free | 15 min | Expat-targeted; high DA |
| **ThaiVisa.com** business directory | Free | 15 min | Niche-relevant for visa queries |
| **Bangkok Post directory** | Free / paid | 30 min | High DA media site |
| **LinkedIn Company Page** | Free | 30 min | Publish 2 posts/month from founder profile; link to bestbridge.cloud |
| **Clutch.co** listing | Free | 1 hr | B2B-services directory; collect verified reviews here |
| **GoodFirms** listing | Free | 30 min | Similar to Clutch |
| **Trustpilot** business page | Free | 15 min | Reviews accumulate over time |
| **Local expat blogs** (guest posts) | Free | 5 hrs each | Pitch "Top 5 visa mistakes" / "BOI explained" articles; link back |

**Anchor text strategy**: 60% branded ("BestBridge Consultancy"), 20% generic ("learn more"), 20% keyword ("Bangkok visa consultant"). Never buy paid links — Google's spam team detects them and the penalty is severe.

---

## Phase 5E — Review generation (ongoing, ~30 min/week)

Reviews are the #2 ranking factor for local + AI search citation, after backlinks. Target: **10 Google reviews in first 90 days, 30 by end of year 1**.

### Email template — send to every closed client

> Subject: Quick favour — would you leave a Google review for BestBridge?
>
> Hi [Name],
>
> Hope your [visa/work permit/HR engagement] is going smoothly now that we've wrapped up.
>
> If you have 2 minutes and were happy with how it went, would you leave a quick Google review? It's the single most valuable thing you can do to help us reach more clients like you.
>
> Here's the link: **[YOUR_GOOGLE_REVIEW_LINK]**
>
> Even one sentence is hugely helpful. And if anything wasn't perfect, please reply to this email — we'd rather hear it from you than read it on Google.
>
> Thanks so much,
> [Your name]

Get your Google review link from: Google Business Profile → Home → "Get more reviews" → Share → Copy link.

---

## Phase 6 — Google Ads campaign blueprint (Week 2, ~$500/mo budget)

### Step 1: Account setup (one-time, 60 min)

1. https://ads.google.com → Create account
2. **Skip the "smart campaign" wizard** — choose **Expert mode**
3. **Link to GA4 / GTM**: Tools → Linked accounts → Google Analytics → Link
4. **Conversion tracking**: Tools → Conversions → New conversion → **Website** → Action: "Lead form submission" → fire via GTM
5. In `lib/actions/contact.ts`, after successful Resend send, the form already shows success state. To wire conversion: in `components/landing/booking-form.tsx` success path, push to dataLayer:
   ```js
   window.dataLayer?.push({ event: "lead_submit", value: 1 });
   ```
   Then in GTM, create a trigger for `event = lead_submit` firing a Google Ads conversion tag. (We can wire this when you set up the GTM container.)

### Step 2: Campaign structure (3 search campaigns)

**Campaign 1 — Visa & Work Permit Services**

- Bid strategy: Manual CPC (Maximize Clicks once you have 30+ conversions)
- Daily budget: ฿300 (~$8.50)
- Geographic: Thailand. Bid modifier +30% Bangkok, +15% Phuket/Chiang Mai
- Languages: English, Thai
- Ad groups + keywords (Phrase Match recommended):
  - **BOI Work Permit**: "boi work permit thailand", "boi visa consultant", "one stop service center"
  - **Non-B Visa**: "non b visa thailand", "thailand work permit help", "non immigrant b visa"
  - **90-day Reporting**: "90 day report bangkok", "tm 47 service", "immigration 90 day"
  - **Retirement Visa**: "thailand retirement visa", "non o-a visa", "retirement visa bangkok"

**Campaign 2 — HR Services**

- Daily budget: ฿200
- Ad groups:
  - **HR Outsourcing**: "hr outsourcing thailand", "outsourced hr bangkok"
  - **Payroll**: "payroll services thailand", "payroll outsourcing bangkok"
  - **Compliance**: "thai labor law compliance", "employment contract thailand"

**Campaign 3 — Legal Services**

- Daily budget: ฿200
- Ad groups:
  - **Corporate Legal**: "corporate lawyer bangkok", "legal services thailand"
  - **Business Setup**: "company registration thailand", "business setup bangkok"
  - **Contracts**: "contract drafting thailand", "contract review bangkok"

### Step 3: Negative keywords (apply to all campaigns)

Block irrelevant searches that waste budget:
```
free, gratis, jobs, salary, vacancies, careers, course, training, classes,
school, university, student, study, tourist visa, ed visa, work from home,
remote worker, scam, complaint, fraud
```

### Step 4: Ad copy (Responsive Search Ads, 3 per ad group)

**Headlines (15 — vary across all 3 ads)**:
- BestBridge — Thailand Visa Experts
- BOI Work Permits in 1–2 Weeks
- Bangkok-Based Visa Consultancy
- 15+ Years HR & Mobility Experience
- Free Consultation Today
- Same-Day Quote, Fixed Pricing
- English & Thai Service
- BOI & Non-BOI Specialists
- Work Permit Done Right, First Time
- Trusted by Bangkok SMEs
- Bookable Online — Reply in 1 Day
- Visa, HR & Legal Under One Roof
- 100% Money-Back Refile Guarantee*
- No Hourly Billing — Fixed Quotes
- Local Experts. Global Standards.

**Descriptions (4 — vary across all 3 ads)**:
- Fast, reliable Thai visas and work permits. Free consultation. BOI experts. Fixed pricing — no hourly billing surprises.
- HR, visa and legal services under one roof. 15+ years of experience. We file BOI work permits in 1–2 weeks.
- Stop queuing at Chaeng Wattana. We handle the paperwork, the government follow-up, and deliver to your door.
- Book a free 30-min consultation. We'll tell you honestly whether we're the right fit. Bangkok-based, English & Thai.

**Landing page URLs** (use deep anchors that already exist):
- Visa ads → `https://www.bestbridge.cloud/services#visa`
- HR ads → `https://www.bestbridge.cloud/services#hr`
- Legal ads → `https://www.bestbridge.cloud/services#legal`

### Step 5: Extensions (boosts Quality Score & CTR)

- **Sitelink extensions**: Visa, HR, Legal, Contact, About
- **Callout extensions**: "Free Consultation", "BOI Experts", "Fixed Pricing", "1-Day Response", "English & Thai"
- **Structured snippets**: Services → Visa, Work Permits, HR, Payroll, Legal, Contracts
- **Call extension**: +66 86 115 6922 (only during business hours)
- **Location extension**: Linked to Google Business Profile once verified

### Step 6: First 2 weeks — what to watch

- **Quality Score** (Tools → Keywords → add "Quality Score" column) — aim ≥ 7/10. Below 7 means your ad copy doesn't match the landing page; rewrite ad headlines to mirror page H1s.
- **CTR** — aim ≥ 4%. Lower means ad copy is weak; A/B different headlines.
- **Conversion rate** — once you have 30+ conversions, the data is reliable. Below 2% = the form / landing page is the bottleneck. Above 5% = increase budget.
- **Search Terms report** (Keywords → Search terms) — add new negatives weekly.
- **Don't enable Performance Max** for the first 60 days. Search campaigns give you cleaner data.

### Expected results (90 days, $500/mo budget)

- ~3,000 clicks/mo (Thai market CPC averages $0.15–0.40 for these terms)
- ~120 leads at 4% conversion rate
- ~24 clients at 20% lead → client conversion
- ROAS depends on your average client value — if avg client = $400, this is 19× return

---

## Quick-reference: what each phase delivers

| You do | Time | Impact |
|---|---|---|
| Phase 5A — Search Console | 15 min | Pages get indexed by Google |
| Phase 5B — Bing Webmaster | 10 min | Pages get indexed by Bing/DuckDuckGo |
| Phase 5C — Google Business Profile | 30 min + verify | Map pack visibility, +20–30% local search traffic |
| Phase 5D — Backlinks (gradual) | 90 min + ongoing | Domain authority growth, +50–100% rank by month 6 |
| Phase 5E — Reviews | 30 min/week | Trust signal for AI + Google, 10 reviews lifts CTR ~10% |
| Phase 6 — Google Ads | 4 hours setup + budget | Immediate top-of-page placement; ~120 leads/mo at $500/mo budget |

---

## When to ask Claude for help

- "Wire up the Google Ads conversion event" — once you have Tag Manager set up, Claude can add the dataLayer push in `booking-form.tsx`
- "Write a Google Business Profile post about [topic]" — Claude drafts; you publish
- "Draft a guest post pitch for InterNations Bangkok" — Claude drafts the cold email
- "Generate this month's Google Ads search term review" — paste the CSV from Ads → Claude flags new negatives & suggests bid changes
- "Add a new FAQ Q for [topic]" — Claude appends to `lib/landing-content.ts` + the FAQPage schema auto-updates
