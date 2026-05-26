# aT Overseas Branch — K-Food Trade Platform

A modern B2B digital platform that helps overseas buyers, distributors, and
retailers discover Korean food products, programs, and supplier information.
Currently configured for the **New York branch** of the
Korea Agro-Fisheries & Food Trade Corporation (aT), and designed to be
easily reused for other overseas branches.

---

## Getting started

```bash
bun install
bun run dev      # start the dev server
bun run build    # production build
```

The app runs on TanStack Start (React 19 + Vite 7) with Tailwind CSS v4.

---

## Project structure

```
src/
├── routes/                     # File-based routes (TanStack Router)
│   ├── __root.tsx              # Root layout (html shell, providers)
│   ├── index.tsx               # Homepage
│   ├── about.*.tsx             # About section (layout + sub-pages)
│   ├── programs.*.tsx          # Programs section (layout + sub-pages)
│   ├── products.tsx            # Product catalogue
│   ├── notifications.tsx       # Latest updates / announcements
│   ├── contact.tsx             # Contact + inquiry form
│   └── sitemap[.]xml.ts        # SEO sitemap
│
├── components/
│   ├── layout/                 # SiteHeader, SiteFooter, SiteLayout
│   ├── about/                  # About sub-page wrapper
│   └── ui/                     # shadcn/ui primitives
│
├── data/                       # ⭐ Branch-configurable content
│   ├── branch.ts               # Branch info (name, address, phone, email…)
│   ├── products.ts             # Product catalogue + categories
│   ├── programs.ts             # Trade programs offered by this branch
│   └── updates.ts              # Latest news / notifications
│
├── assets/                     # Hero & product imagery
└── styles.css                  # Design tokens (colors, gradients, shadows)
```

---

## Adapting this site for another overseas branch

The platform is built so that swapping the branch (e.g. New York → Los Angeles,
Tokyo, Paris, Hanoi) only requires editing data files — no component logic
needs to change.

### 1. Update branch info — `src/data/branch.ts`

Edit the single `branch` object: organization, branch name, display name,
tagline, market label, address, phone, email, and office hours. These values
flow automatically into the header, footer, contact page, and metadata.

### 2. Update the product catalogue — `src/data/products.ts`

Add or remove `Product` entries and category metadata so the catalogue
reflects what's relevant in that market (e.g. Halal-certified items for
Southeast Asia, organic lines for the EU).

### 3. Update programs — `src/data/programs.ts`

Each overseas branch runs different trade programs. Update the `programs`
array (slug, title, summary, highlights, target audience) — the program
routes and homepage will pick the changes up automatically.

### 4. Update announcements — `src/data/updates.ts`

Replace the sample `updates` with the branch's own announcements, trade
exhibitions, buyer-matching events, and regulation news.

### 5. (Optional) Refresh imagery — `src/assets/`

Replace `hero-kfood.jpg` and category images with market-appropriate visuals.

### 6. (Optional) Adjust theme — `src/styles.css`

All colors live as design tokens (`--navy`, `--brand-green`, `--gold`, …).
If a branch needs a slightly different accent, change the tokens here — the
whole UI follows.

### What you should NOT need to change

- Routing structure (`src/routes/`)
- Layout components (`SiteHeader`, `SiteFooter`, `SiteLayout`)
- shadcn/ui primitives
- Build configuration

---

## Tech stack

- **Framework:** TanStack Start v1 (React 19, SSR-ready)
- **Bundler:** Vite 7
- **Styling:** Tailwind CSS v4 + custom design tokens
- **UI primitives:** shadcn/ui (Radix + Tailwind)
- **Forms:** Zod validation
- **Icons:** lucide-react

---

## License

© Korea Agro-Fisheries & Food Trade Corporation (aT). All rights reserved.
