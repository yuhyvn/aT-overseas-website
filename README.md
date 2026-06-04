# aT Overseas Branch — K-Food Trade Platform

A modern B2B digital platform that helps overseas buyers, distributors, and
retailers learn about Korean food trade support programs and office updates.
Currently configured for **aT Center New York** of the
Korea Agro-Fisheries & Food Trade Corporation (aT), and designed to be
easily reused for other overseas centers.

---

## Getting started

```bash
bun install
bun run dev      # start the dev server
bun run build    # production build
```

The app runs on TanStack Start (React 19 + Vite 7) with Tailwind CSS v4.

---

## Notice Admin

Notices are managed through Supabase. Visitors read notices from the public
`notices` table, while authenticated administrators can create, update, and
delete notices at `/admin/notices`.

Required environment variables:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Run the SQL in `supabase-notices.sql` inside Supabase SQL Editor to create the
table and access policies. If Supabase is not configured yet, the site falls
back to local sample data in `src/data/updates.ts`.

Admin workflow:

1. Go to `/admin/login`.
2. Sign in with a Supabase Auth user.
3. Go to `/admin/notices`.
4. Create, edit, delete, or view published notices.

For action buttons, leave action label/link empty unless the notice needs a
button. Valid action links should start with `mailto:`, `https://`, or `http://`.

---

## Project structure

```
src/
├── routes/                     # File-based routes (TanStack Router)
│   ├── __root.tsx              # Root layout (html shell, providers)
│   ├── index.tsx               # Homepage
│   ├── about.*.tsx             # About section (layout + sub-pages)
│   ├── programs.*.tsx          # Support Programs section (layout + sub-pages)
│   ├── products.tsx            # Legacy hidden product route
│   ├── notifications*.tsx      # Public notice list + detail pages
│   ├── admin*.tsx              # Supabase login + notice management
│   └── sitemap[.]xml.ts        # SEO sitemap
│
├── components/
│   ├── layout/                 # SiteHeader, SiteFooter, SiteLayout
│   ├── about/                  # About sub-page wrapper
│   └── ui/                     # shadcn/ui primitives
│
├── data/                       # ⭐ Branch-configurable content
│   ├── branch.ts               # Center info (name, address, phone, email…)
│   ├── products.ts             # Legacy product data, currently not linked in navigation
│   ├── programs.ts             # Support programs offered by this center
│   └── updates.ts              # Latest news / notifications
│
├── assets/                     # Hero & product imagery
└── styles.css                  # Design tokens (colors, gradients, shadows)
```

---

## Adapting this site for another overseas center

The platform is built so that swapping the center (e.g. New York → Los Angeles,
Tokyo, Paris, Hanoi) only requires editing data files — no component logic
needs to change.

### 1. Update center info — `src/data/branch.ts`

Edit the single `branch` object: organization, center name, display name,
tagline, market label, address, phone, email, and office hours. These values
flow automatically into the header, footer, office summaries, and metadata.

### 2. Update support programs — `src/data/programs.ts`

Each overseas center may run different support programs. Update the `programs`
array (slug, title, summary, highlights, target audience) — the program
routes and homepage will pick the changes up automatically.

### 3. Update announcements

For production, use the Supabase admin screen at `/admin/notices`. The local
`src/data/updates.ts` file is only fallback sample data.

### 4. (Optional) Refresh imagery — `src/assets/`

Replace `hero-kfood.jpg` and category images with market-appropriate visuals.

### 5. (Optional) Adjust theme — `src/styles.css`

All colors live as design tokens (`--navy`, `--brand-green`, `--gold`, …).
If a center needs a slightly different accent, change the tokens here — the
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
