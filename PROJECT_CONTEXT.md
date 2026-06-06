# OSR Website — Project Context (handoff brief)

> Paste this file (or its contents) at the start of a new chat so the assistant
> instantly understands the project. It describes what OSR is, the brand, the
> tech, the architecture, what's done, and what's left.

---

## 1. What this is

A premium, **bilingual (Arabic-first / English)** corporate marketing website for
**OSR** — positioned as a **digital services ecosystem / technology platform**, not
a single app. Built as a real, production-grade **Next.js 15 (App Router)** project.

Two deliverables already exist:
- `osr-website/` — the full Next.js project (a `.zip` was produced).
- `osr-preview.html` — a single self-contained static HTML preview of the homepage
  with a working Arabic(RTL)/English(LTR) toggle, used to *see* the design. It
  mirrors the design but is NOT the source of truth; the Next.js project is.

OSR's underlying business (from brand assets) is a **food / services marketplace**
(restaurants, products, delivery), but the site frames it as an **ecosystem** with
four roles: **Customers, Service Providers, Representatives (delivery), Operations**.

---

## 2. Brand identity (from the supplied PDF)

- **Primary color — Yellow/Orange:** `#F9B233`
- **Accent — Fire-engine Red:** `#C8102E` (the PDF's red hex was OCR-garbled; this
  matches the logo's deep red)
- **Ink (warm near-black):** `#1A1410` · **Cream canvas:** `#FFFBF3`
- **Black `#000000` / White `#FFFFFF`**
- **Fonts (mandated):** English = **IBM Plex Sans**, Arabic = **IBM Plex Sans Arabic**
  (loaded via `next/font/google`).
- **Logo:** "OSR" wordmark — orange outlined letters, a **red frying pan** forming
  the R's tail, **red cooking utensils** (spatula/fork/spoon) above with little
  spark marks. Rebuilt as inline SVG in `src/components/ui/logo.tsx`.
- **Motif:** hand-drawn food-icon line pattern (fish, bread, pan, pizza…), used as a
  subtle texture only (`public/pattern.svg`).
- **Tone:** warm, premium, trustworthy, enterprise — think Stripe/Linear structure
  with a warm food-tech palette.

---

## 3. Tech stack

Next.js 15.1.6 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS ·
shadcn-style UI primitives · Framer Motion 11 · **next-intl 3.26.5** · next/font ·
lucide-react. Server Components by default.

---

## 4. Project structure

```
osr-website/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                 # root pass-through
│  │  ├─ globals.css                # design tokens + base + 3D shape utilities
│  │  ├─ fonts.ts                   # IBM Plex Sans + Plex Arabic (next/font/google)
│  │  ├─ sitemap.ts / robots.ts / manifest.ts
│  │  └─ [locale]/
│  │     ├─ layout.tsx              # <html lang/dir>, generateMetadata, intl provider, header/footer
│  │     ├─ page.tsx                # composes all sections + JSON-LD
│  │     └─ not-found.tsx
│  ├─ components/
│  │  ├─ layout/                    # header, footer, language-switcher
│  │  ├─ sections/                  # hero, about, ecosystem, features, products,
│  │  │                             #   screenshots, download, how-it-works, why,
│  │  │                             #   stats, testimonials, partners, faq, contact
│  │  ├─ seo/json-ld.tsx            # Organization/Website/FAQ/MobileApplication/Breadcrumb
│  │  └─ ui/                        # button, logo, section, reveal, app-badges
│  ├─ config/
│  │  ├─ site.ts                    # URL, contact, social (EDIT before deploy)
│  │  └─ apps.ts                    # ← dynamic application registry (key file)
│  ├─ i18n/                         # routing.ts, navigation.ts, request.ts
│  └─ middleware.ts                 # locale negotiation
├─ messages/ ar.json · en.json      # all copy; identical key trees (verified)
├─ public/ pattern.svg, og.png, icon.png, favicon.ico,
│          screens/{login,browse,detail}.jpg   # REAL app screenshots
└─ README.md
```

---

## 5. Key conventions & decisions (don't relearn these)

- **Server-first.** Only these ship client JS: `header`, `reveal` (animation),
  `faq` (accordion), `contact` (form), `language-switcher`. Everything else is a
  Server Component.
- **next-intl 3.26.5 quirks already handled:**
  - `hasLocale` does NOT exist in this version → use `isValidLocale()` from
    `src/i18n/routing.ts`.
  - `NextIntlClientProvider` is rendered WITH `locale` + `messages` props
    (the prop-less v4 form breaks client components → "MISSING_MESSAGE").
- **RTL/LTR** via logical CSS props (`start`/`end`, `ms`/`me`). `dir` set per-locale
  on `<html>`. `.flip-x` flips directional icons. Active locale maps
  `--font-sans`/`--font-display` to Plex Arabic or Plex Sans on `<html>`.
- **Static rendering:** `generateStaticParams` + `setRequestLocale`; `/ar` and `/en`
  prerender to static HTML.
- **Animation:** one shared `Reveal` primitive (scroll fade-up, reduced-motion safe).
- **Section content** comes from `messages/*.json` via `t.raw("items")` arrays mapped
  in each section. **Both locale files MUST keep identical key structures.**

---

## 6. Dynamic application registry (important)

`src/config/apps.ts` is the single source of truth for apps. The **Download** section,
**Products** grid, and **MobileApplication JSON-LD** all read from it. Add a new OSR
app = append one typed entry (`id`, `audience`, `name{ar,en}`, `tagline{ar,en}`,
`links{appStore?,googlePlay?}`, `rating?`, `ratingCount?`, `featured?`, `icon`).
Omit a store link to hide that badge; omit both for a product with no download.

---

## 7. Real assets

Three **real OSR app screenshots** were extracted from the brand PDF (page 8),
background-removed, and cropped to the screen:
`public/screens/login.jpg`, `browse.jpg`, `detail.jpg` (620×1192).
Used in the Hero (browse) and the **Screenshots** showcase section.
`og.png` / `icon.png` are generated brand placeholders — replace with final art.

---

## 8. Design system tokens (in `globals.css`, HSL channels)

`--osr-orange 38 95% 59%` · `--osr-orange-deep 33 92% 46%` ·
`--osr-red 351 85% 42%` · `--osr-red-deep 351 80% 33%` ·
`--osr-ink 24 30% 8%` · `--osr-cream 40 60% 98%`.
Utilities: `.osr-eyebrow`, `.osr-headline`, `.text-gradient`, `.osr-pattern`, and
**3D shapes**: `.osr-orb` (`.osr-orb-orange`/`.osr-orb-red`), `.osr-ring3d`,
`.osr-device` (screenshot frame), plus `animate-float`, `animate-float-slow`,
`animate-spin-3d`.

---

## 9. SEO (implemented)

Metadata API (title template, description, keywords), Open Graph, Twitter Cards,
canonical + hreflang `alternates` (incl. `x-default`), and JSON-LD for
Organization / Website / FAQ / MobileApplication / Breadcrumb (in
`components/seo/json-ld.tsx`, rendered in `page.tsx`). `robots.txt`, `sitemap.xml`,
`manifest.webmanifest` via route handlers.

---

## 10. Status — what's verified vs. pending

**Verified:** `npm run build` compiles cleanly; `/ar` and `/en` prerender as static
HTML; `robots.txt` / `sitemap.xml` / `manifest.webmanifest` generate. First Load JS
≈ 173 kB on the locale route.

**Pending / known issues (do before production):**
- [ ] `next@15.1.6` has a published CVE → `npm i next@latest` and re-verify build.
- [ ] Set real values in `src/config/site.ts` (`url`, `email`, `phone`, `social`,
      `twitter`).
- [ ] Real App Store / Google Play URLs in `src/config/apps.ts`.
- [ ] Replace `public/og.png` + `public/icon.png` with final brand art.
- [ ] Wire the contact form (`sections/contact.tsx`) to a backend/CRM (currently
      client-side success state only).
- [ ] Replace placeholder partner names in `sections/partners.tsx`.
- [ ] Lighthouse scores (targets: Perf 95+, SEO 100, A11y 95+, BP 100) are design
      goals — measure on a deployed build.
- ⚠️ The build fetches Google Fonts at **build time** (no runtime dependency). In an
  air-gapped CI, switch `src/app/fonts.ts` to `next/font/local` with `@ibm/plex` files.

---

## 11. Run / deploy

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /ar
npm run build && npm run start
npm run typecheck  # tsc --noEmit
```
**Deploy:** Vercel (zero-config). Static export NOT supported (i18n middleware needs a
Node runtime). For Docker, add `output: "standalone"` to `next.config.mjs`.

---

## 12. Likely next tasks (how to continue)

- **Add an app:** append to `src/config/apps.ts`.
- **Edit copy:** `messages/{ar,en}.json` (keep key trees identical).
- **New section:** create `src/components/sections/<name>.tsx`, add its keys to both
  message files, import + render it in `src/app/[locale]/page.tsx`.
- **Restyle:** brand tokens live in `src/app/globals.css` + `tailwind.config.ts`.
- **Swap hero/showcase images:** files in `public/screens/`.
- **Reduce JS:** the `Reveal` Framer-Motion primitive could become a CSS-only
  IntersectionObserver reveal to drop Framer Motion from the critical path.

> When resuming, the assistant should NOT rebuild from scratch — extend the existing
> `osr-website/` project and keep the conventions in sections 5–6 above.
