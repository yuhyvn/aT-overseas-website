# aT Overseas Branch — Official Branch Site

A simple, official overseas-branch website for the
Korea Agro-Fisheries & Food Trade Corporation (aT). Currently configured for
the **New York branch**, and designed to be easily reused for other overseas
branches by editing a small number of data files.

The site focuses on official branch information rather than marketing —
similar in spirit to overseas-office pages of other Korean public agencies.

---

## Getting started

```bash
bun install
bun run dev      # start the dev server
bun run build    # production build
```

The app runs on TanStack Start (React 19 + Vite 7) with Tailwind CSS v4.

---

## Site structure (pages)

| Path         | Purpose                                                      |
| ------------ | ------------------------------------------------------------ |
| `/`          | Home — welcome, quick links, office summary, recent notices  |
| `/about`     | About Office — single page introducing the branch            |
| `/notices`   | Notices — announcements, events, regulatory updates          |
| `/resources` | Resources — K-Food categories, programs, useful links        |
| `/contact`   | Contact — office information and inquiry form                |

The top navigation has only these five items, mirroring the page list above.

---

## Project structure

```
src/
├── routes/                     # File-based routes (TanStack Router)
│   ├── __root.tsx              # Root layout (html shell, providers)
│   ├── index.tsx               # Home
│   ├── about.tsx               # About Office (single page)
│   ├── notices.tsx             # Notices
│   ├── resources.tsx           # Resources (K-Food categories + programs + links)
│   ├── contact.tsx             # Contact + inquiry form
│   └── sitemap[.]xml.ts        # SEO sitemap
│
├── components/
│   ├── layout/                 # SiteHeader, SiteFooter, SiteLayout
│   └── ui/                     # shadcn/ui primitives
│
├── data/                       # ⭐ Branch-configurable content
│   ├── branch.ts               # Branch info (name, address, phone, email…)
│   ├── products.ts             # K-Food categories shown on /resources
│   ├── programs.ts             # Trade programs shown on /resources
│   └── updates.ts              # Notices shown on /notices and home
│
├── assets/                     # Hero & category imagery
└── styles.css                  # Design tokens (colors, gradients, shadows)
```

---

## Adapting this site for another overseas branch

The platform is built so swapping the branch (e.g. New York → Los Angeles,
Tokyo, Paris, Hanoi) only requires editing data files. **Start with
`src/data/branch.ts`** — that single file drives the header, footer, contact
page, hero copy, and metadata across the entire site.

### 1. Branch info — `src/data/branch.ts`

Update the `branch` object: organization, branch name, display name, tagline,
market label, address, phone, email, established year, and office hours.

### 2. K-Food categories — `src/data/products.ts`

Adjust the categories shown on `/resources` and the home page to reflect the
items most relevant to that market.

### 3. Programs — `src/data/programs.ts`

Each branch runs different trade-support programs. Edit the list — the
Resources page picks up changes automatically.

### 4. Notices — `src/data/updates.ts`

Replace the sample notices with the branch's own announcements.

### 5. (Optional) Imagery — `src/assets/`

Replace `hero-kfood.jpg` and category images with market-appropriate visuals.

### 6. (Optional) Theme — `src/styles.css`

All colors live as design tokens (`--navy`, `--brand-green`, `--gold`, …).
Adjust the tokens if a branch needs a slightly different accent.

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
