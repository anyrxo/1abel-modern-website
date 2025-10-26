# 1ABEL WEBSITE SECURITY & PROTECTION

**Brand Owner:** IImagined Company
**Brand Name:** 1ABEL
**Designer:** Anyro (@anyrxo)

---

## SECURITY MEASURES IMPLEMENTED

This document outlines all security measures protecting 1ABEL's intellectual property, code, and brand assets from theft, scraping, and unauthorized reproduction.

### 1. **Text Selection Protection** ✅
- **Status:** ACTIVE
- **Implementation:** `user-select: none` in globals.css
- **Coverage:** All text site-wide (except form inputs)
- **Effectiveness:** Prevents casual copy-paste theft
- **Bypass Risk:** Medium (can view source, but annoys copycats)

### 2. **Right-Click Protection** ✅
- **Status:** ACTIVE
- **Implementation:** SecurityProtection.tsx component
- **Coverage:** Global context menu disabled
- **Effectiveness:** Stops right-click → Save Image
- **Bypass Risk:** Medium (DevTools still accessible to experts)

### 3. **DevTools Keyboard Shortcuts Blocked** ✅
- **Status:** ACTIVE
- **Blocked Keys:**
  - F12 (DevTools)
  - Ctrl+Shift+I (Inspect)
  - Ctrl+Shift+J (Console)
  - Ctrl+U (View Source)
  - Ctrl+S (Save Page)
  - Ctrl+Shift+C (Inspect Element)
- **Effectiveness:** Stops casual developers
- **Bypass Risk:** Medium-High (experts can still access via browser menu)

### 4. **DevTools Detection** ✅
- **Status:** ACTIVE
- **Implementation:** Detects when DevTools window is open
- **Action:** Clears console every 2 seconds when detected
- **Effectiveness:** Annoys scrapers trying to debug
- **Bypass Risk:** High (doesn't prevent access, just annoys)

### 5. **Headless Browser Detection** ✅
- **Status:** ACTIVE
- **Implementation:** Checks for `navigator.webdriver`
- **Action:** Blocks Puppeteer, Playwright, Selenium automated scrapers
- **Effectiveness:** HIGH for blocking automated scraping
- **Bypass Risk:** Medium (can be circumvented with advanced techniques)

### 6. **Image Drag & Drop Disabled** ✅
- **Status:** ACTIVE
- **Implementation:** `dragstart` event prevented
- **Effectiveness:** Stops drag-and-drop image theft
- **Bypass Risk:** Low (still can right-click if bypass other protections)

### 7. **AI Scraper Blocking (robots.txt)** ✅
- **Status:** ACTIVE
- **Blocked Bots:**
  - **OpenAI:** GPTBot, ChatGPT-User, OAI-SearchBot
  - **Anthropic:** anthropic-ai, Claude-Web, ClaudeBot
  - **Others:** CCBot, Diffbot, PerplexityBot
  - **Scraping Services:** Firecrawl, Apify, Luminati/Bright Data
  - **SEO Tools:** SemrushBot, AhrefsBot, DotBot, MJ12bot, Screaming Frog
  - **Search Engines:** Bytespider, PetalBot, YandexBot, Baiduspider
  - **Generic:** AI2Bot, Amazonbot, cohere-ai, Omgilibot, YouBot
  - **Frameworks:** scrapy, python-requests, curl, wget
- **Allowed Bots:**
  - Google (Googlebot, Googlebot-Image)
  - Bing (Bingbot)
  - Social Media (facebookexternalhit, Twitterbot, LinkedInBot, etc.)
- **Effectiveness:** HIGH for compliant bots
- **Bypass Risk:** Medium (malicious bots can spoof user agents)

### 8. **Copyright Meta Tags** ✅
- **Status:** ACTIVE
- **Tags Added:**
  ```html
  <meta name="copyright" content="© 2025 1ABEL - A Brand of IImagined Company" />
  <meta name="author" content="IImagined Company" />
  <meta name="owner" content="IImagined Company" />
  <meta name="rights" content="Unauthorized reproduction prohibited" />
  <meta name="scraping" content="prohibited" />
  <meta name="ai-training" content="prohibited" />
  <meta name="data-extraction" content="prohibited" />
  ```
- **Effectiveness:** Legal documentation, not technical prevention
- **Purpose:** Establishes ownership for legal action

### 9. **Invisible DOM Watermarks** ✅
- **Status:** ACTIVE
- **Implementation:** Hidden div with copyright data attributes
- **Data Embedded:**
  - Copyright notice
  - Owner (IImagined Company)
  - Unauthorized use warning
- **Effectiveness:** Low for prevention, high for forensics
- **Purpose:** Forensic evidence if site is cloned

### 10. **Console Clearing** ✅
- **Status:** ACTIVE
- **Implementation:** Clears console every 2 seconds
- **Effectiveness:** Annoys developers trying to inspect code
- **Bypass Risk:** High (just annoyance, not real protection)

---

## LEGAL PROTECTIONS

### 1. **Terms of Use Page** ✅
- **Location:** `/terms-of-use`
- **Coverage:**
  - Intellectual property rights
  - Prohibited uses (scraping, AI training, image theft)
  - Permitted uses
  - DMCA enforcement policy
  - AI & automated access rules
  - Image usage restrictions
- **Effectiveness:** Legal foundation for enforcement

### 2. **Copyright Notices** ✅
- **Implemented:**
  - Footer on all pages
  - Meta tags in HTML head
  - Invisible DOM watermarks
  - Terms of Use page
- **Format:** `© 2025 1ABEL - A Brand of IImagined Company. All Rights Reserved.`

### 3. **Trademark Claims** 🟡
- **Status:** CLAIMED (not yet registered)
- **Protected Marks:**
  - "1ABEL" (word mark)
  - "Where Sound Becomes Style" (tagline)
  - "Arc 2 Shadow" / "Arc 3 Light" (collection names)
- **Recommendation:** File USPTO trademark application ASAP

---

## WHAT'S PROTECTED vs. WHAT'S NOT

### ✅ **PROTECTED:**
1. **Text Content** - user-select disabled, AI scrapers blocked
2. **Images** - right-click disabled, drag-drop disabled (watermarks recommended)
3. **Brand Name** - copyright claimed, Terms of Use enforced
4. **Product Descriptions** - copyright protected
5. **Design Concepts** - documented in Terms of Use
6. **Code** - DevTools shortcuts blocked, console cleared

### ⚠️ **PARTIALLY PROTECTED:**
1. **Website Design** - Can be recreated manually (not scraped easily)
2. **Color Palettes** - Ideas not protectable, but execution is
3. **Product Photos** - No visible watermarks yet (RECOMMENDED TO ADD)

### ❌ **NOT PROTECTED:**
1. **General UX Patterns** - Common patterns can't be copyrighted
2. **Color Names** - "VOID", "STEEL" too generic to protect
3. **Generic Terms** - "THERMAL", "CARGO PANTS" are descriptive
4. **View Source** - Code still visible to determined developers

---

## RECOMMENDED NEXT STEPS

### 🔴 **CRITICAL (Do Immediately):**
1. **File Trademark for "1ABEL"**
   - Cost: $250-$500
   - Timeline: 6-12 months
   - Why: Without this, legal enforcement is weak

2. **Add Visible Watermarks to Product Images**
   - Placement: Bottom-right corner or centered
   - Opacity: 30-50%
   - Text: "1ABEL" or "©1ABEL"
   - Why: Product images are most stolen asset

### 🟡 **IMPORTANT (Do This Month):**
1. **Set Up Image Theft Monitoring**
   - Use Google Reverse Image Search (FREE)
   - Or TinEye Alerts (FREE for 150/mo)
   - Or Pixsy ($10-50/mo)
   - Why: Catch copycats early

2. **Add Google Alerts for Brand Monitoring**
   - Set alerts for "1ABEL"
   - Set alerts for "IImagined Company"
   - Set alerts for "Where Sound Becomes Style"
   - Why: Know when you're being mentioned/copied

### 🟢 **OPTIONAL (Future Enhancements):**
1. **Cloudflare Bot Protection** ($200/mo)
   - Advanced bot detection
   - Rate limiting
   - DDoS protection

2. **Code Obfuscation** (FREE-$200/mo)
   - Harder to read source code
   - ROI questionable for fashion site

3. **DMCA Takedown Service** ($500-2000/case)
   - Only if trademark is registered
   - For serious infringement cases

---

## HOW TO TEST PROTECTIONS

### Manual Testing:
1. **Try to select text** → Should fail
2. **Right-click on page** → Context menu should not appear
3. **Press F12** → Should not open DevTools
4. **Press Ctrl+U** → Should not show view source
5. **Try to drag an image** → Should not work
6. **Open DevTools via browser menu** → Console should keep clearing

### AI Scraping Test:
1. Try accessing site with: `curl https://1abel.com` → Should work but see robots.txt
2. Check robots.txt: `https://1abel.com/robots.txt` → Should list all blocked bots

### Legal Compliance Test:
1. Visit `/terms-of-use` → Should load comprehensive terms
2. Check page source → Should see copyright meta tags
3. Inspect footer → Should see IImagined Company attribution

---

## MAINTENANCE

### Monthly Tasks:
- [ ] Run reverse image search on 5 key product images
- [ ] Check Google Alerts for brand mentions
- [ ] Review robots.txt for new AI scrapers to block
- [ ] Update copyright year if needed (Jan 1st)

### Quarterly Tasks:
- [ ] Check for copycat websites manually
- [ ] Review Terms of Use for updates
- [ ] Test all security protections still working

### Annually:
- [ ] Renew trademark (once registered)
- [ ] Update legal notices if company structure changes
- [ ] Review and update blocked bots list

---

## INCIDENT RESPONSE

**If you discover someone copying your site:**

1. **Document Everything**
   - Take screenshots with timestamps
   - Save URLs and archive with archive.org
   - Document what was copied

2. **Cease & Desist (If you have trademark)**
   - Send formal letter citing trademark violation
   - Reference your Terms of Use
   - Demand takedown within 14 days

3. **DMCA Takedown (For image/content theft)**
   - File DMCA notice with their web host
   - File DMCA with Google (removes from search)
   - Reference copyright registration

4. **Legal Action (Last Resort)**
   - Only if trademark registered
   - Only for serious/commercial infringement
   - Consult IP attorney

---

## CONTACT INFORMATION

**For legal/copyright issues:**
- Email: legal@iimagined.com
- Subject: Copyright Infringement - 1ABEL

**For brand inquiries:**
- Email: anyro@1abel.com
- Designer: @anyrxo (social media)

**Company:**
- IImagined Company
- Brand: 1ABEL
- Website: https://1abel.com

---

## TECHNICAL DOCUMENTATION

### Files Implementing Security:

1. **SecurityProtection.tsx** - Main security component
   - Right-click disable
   - Keyboard shortcut blocking
   - DevTools detection
   - Headless browser detection
   - Drag-and-drop prevention
   - Console clearing
   - DOM watermarks

2. **globals.css** - Text selection protection
   - `user-select: none` globally
   - Except form inputs

3. **robots.txt** - AI scraper blocking
   - 30+ blocked user agents
   - Google/Bing/social allowed

4. **layout.tsx** - Copyright meta tags
   - Legal ownership metadata
   - Anti-scraping directives

5. **terms-of-use/page.tsx** - Legal terms
   - Comprehensive IP protection policy
   - DMCA enforcement
   - Usage restrictions

6. **LegalFooter.tsx** - Copyright footer
   - Visible on all pages
   - IImagined Company attribution

### Security Stack:
- **Framework:** Next.js 15 (Static Export)
- **Language:** TypeScript
- **Protection Layer:** Client-side + robots.txt
- **Legal Layer:** Copyright + Trademark (pending)

---

**Last Updated:** January 2025
**Document Version:** 1.0
**Maintained By:** IImagined Company

---

## DISCLAIMER

These protections make unauthorized copying **significantly harder** but not impossible.
Determined attackers with technical expertise can still:
- View source code via browser developer menu
- Screenshot images
- Manually recreate designs

**The goal is to make theft inconvenient enough that copycats move on to easier targets.**

For maximum protection, combine technical measures with:
1. Trademark registration ✅ CRITICAL
2. Active monitoring ✅ IMPORTANT
3. Legal enforcement when needed ✅ AS REQUIRED

**Remember:** Best defense is building a strong brand that's hard to replicate authentically.
