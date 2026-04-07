# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

A romantic coupon gift website built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Coupons are stored in Supabase; an admin panel allows CRUD via Supabase Auth.

### Routes

| Route | Purpose |
|---|---|
| `/` | Auth check — redirects to `/password` or `/landing` |
| `/password` | Password gate (guest access) |
| `/landing` | Floating polaroid photo hero |
| `/coupons` | Coupon grid fetched from Supabase |
| `/admin/login` | Admin login (Supabase Auth) |
| `/admin` | Admin dashboard — list all coupons |
| `/admin/coupons/new` | Create coupon |
| `/admin/coupons/[id]/edit` | Edit coupon |

### Key Design Decisions

**Two separate auth systems:**
- *Guest* — client-side only via `localStorage.hasAccess`. Password hardcoded in `components/PasswordGate.tsx`. No Supabase session.
- *Admin* — Supabase Auth (email + password). Session stored in HttpOnly cookie, refreshed by `proxy.ts` on every request.

**Coupon data lives in Supabase.** The `coupons` table schema and seed data are in `supabase/schema.sql`. The static `data/coupons.ts` is kept for reference but no longer imported by any component.

**RLS policy:** anon role can SELECT; authenticated role can INSERT/UPDATE/DELETE. No service role key is used — admin writes go through the user's Supabase Auth session.

**Redemption state** persists in `localStorage` (`redeemedCoupons` key), managed by `hooks/useRedeemedCoupons.ts`. Not stored in Supabase.

**Music** is a single global `HTMLAudioElement` in `MusicContext` (`contexts/MusicContext.tsx`), wrapped in `app/layout.tsx`. Auto-plays on first user interaction.

### Component Hierarchy

```
layout.tsx (MusicProvider)
├── page.tsx                          → auth redirect
├── password/page.tsx                 → PasswordGate.tsx
├── landing/page.tsx                  → LandingHero.tsx
└── coupons/page.tsx [Server]         → CouponsSection.tsx (Client)
                                          ├── CouponCard.tsx
                                          └── CouponModal.tsx

app/admin/(auth)/login/page.tsx       → login form (Client)
app/admin/(panel)/layout.tsx [Server] → AdminNav.tsx (Client)
app/admin/(panel)/page.tsx [Server]   → coupon table + delete actions
app/admin/(panel)/coupons/new/        → CouponForm.tsx (Client)
app/admin/(panel)/coupons/[id]/edit/  → CouponForm.tsx (Client)
```

### Supabase Helpers

- `lib/supabase/client.ts` — browser client (Client Components)
- `lib/supabase/server.ts` — server client using `next/headers` cookies (Server Components, Server Actions)
- `lib/supabase/types.ts` — `CouponRow` and `CouponCategory` types
- `app/admin/actions.ts` — Server Actions: `createCoupon`, `updateCoupon`, `deleteCoupon`

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Customization Points

- **Guest password:** `CORRECT_PASSWORD` in `components/PasswordGate.tsx`
- **Coupons:** edit via `/admin` or directly in Supabase dashboard
- **Photos:** `public/images/img1.jpg` through `img8.jpg`
- **Music:** `public/music/lofi-christmas.mp3`

### Tech Stack Notes

- Next.js 16 uses `proxy.ts` instead of `middleware.ts` — the exported function must be named `proxy`
- Tailwind CSS v4 (PostCSS plugin) — config is in `postcss.config.mjs`
- ESLint v9 flat config in `eslint.config.mjs`
- React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- Path alias `@/*` resolves to the repo root
