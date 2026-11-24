<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Lughati web

Marketing site plus **UI-only** `/login`, `/register`, `/admin/*`, and `/dashboard/*` demos for an Arabic-learning product (Fushah + Amiyah Saudi). No auth, API, backend, lesson player, storage, real audio, or payments. Demo figures, records, and invoices are illustrative — label new UI `Data demo`, `Pratinjau`, or `Contoh`. This directory is **not a git repo**; the runnable app and canonical content live in sibling `../lughati/`. `README.md` is stale (landing-only tree, `../app/`, `../content/`) — trust this file and the code.

## Commands

```powershell
npm install     # once
npm run dev     # http://localhost:3000
npm run lint    # ESLint 9 flat config
npm run build   # production build + TypeScript check (no separate typecheck script)
npm start       # serve the build
```

Verify with `npm run lint` then `npm run build` (no tests, CI, or pre-commit hooks). Deploy as `npm ci && npm run build && npm start` on Node 20.9+ (enforced by `engines`) with a Node host — not a static-only host; a cold build needs network because `next/font` downloads Google Fonts. `metadataBase` in `layout.tsx` is hardcoded to `https://lughati.id` — change it if the deployment domain differs.

## Architecture and toolchain

- Next.js 16.4 App Router, React 19, strict TypeScript (`@/*` → `src/*`), Tailwind CSS 4 with no `tailwind.config.*`: `next.config.ts` `turbopack.rules` loads `@tailwindcss/turbopack`; tokens, dark variant, keyframes, and utilities live in `src/app/globals.css`.
- `next.config.ts` enables `cacheComponents` + `partialPrefetching` app-wide (keep them paired). `cacheComponents` forbids every `runtime` route-segment export — even `runtime = 'nodejs'` — and preserves component state across navigation via React `<Activity>`; `partialPrefetching` prefetches one reusable App Shell per route. Consult `node_modules/next/dist/docs/` before touching caching/layout.
- `src/app/page.tsx` is the landing page; `layout.tsx` holds metadata, fonts, the inline anti-flash theme script, and the global `AddVocabularyProvider`. `src/lib/curriculum.ts` is the only data module: a hand-copied snapshot of `../lughati/content/`, imported at runtime by pages and components. Never import the canonical folder directly (outside the Next root).
- Keep non-interactive markup as server components; only interactive shells, workspaces, and flows are `"use client"`. Admin/dashboard pages pair a client shell with a server overview; detail pages wrap server content in `AdminShell`/`UserShell` and pass panels as `ReactNode`/`children`. Server → client props must be serializable — pass notice templates such as `DemoSelect`'s `{value}`, never callbacks.
- Provider scope is uneven: only `AddVocabularyProvider` is global (`layout.tsx`). `CheckoutFlowProvider` wraps only `/dashboard/paket-premium`; `EditProfileProvider` wraps only `/dashboard/pengaturan-akun`. `useCheckoutFlow()` and `useEditProfile()` throw outside their provider, so wrap any new page that uses them.

## Conventions and interaction contracts

- Auth UIs share `src/components/auth-frame.tsx`; their forms intentionally `preventDefault`. Interactive flows are in-page modals, not routes: checkout/success, edit-profile, invoice/VIP, exam scheduling, AI speech-test, learning-path, materials, vocabulary, mufrodat explanation, AI generator, transaction row actions, and CS review queue.
- Every admin/dashboard `page.tsx` sets `robots: { index: false, follow: false }` in its own metadata — copy that on new routes.
- Copy is Indonesian. Arabic stays RTL with `font-arabic`, `lang="ar"`, and `dir="rtl"`; transliteration stays Latin. Use semantic tokens (`bg-paper`, `bg-surface`, `text-ink`, `text-muted`, `border-line`, `text-brand`, `text-gold`). `emerald-*` and `sand-*` are custom scales in `globals.css`. No icon/animation libraries; add SVGs to `icons.tsx` and keyframes/`@utility` rules to `globals.css`. `cn()` is a string joiner, not `clsx`.
- Dark mode is class-based (`.dark`). `ThemeToggle` uses localStorage key `lughati-theme` and dispatches `lughati:theme-change`; keep `layout.tsx`'s inline head script in sync.
- Landing nav is in-page anchors only: `navLinks` in `curriculum.ts` (5 items: `#ragam`, `#kurikulum`, `#pratinjau`, `#fitur`, `#faq`) drives header/menu; `#daftar` and `#atas` are separate anchors in `page.tsx`. Use `Link` for routes, plain `<a>` for anchors.
- Keep paired contracts in sync: `user-shell` broadcasts `lughati:track-change` (`detail: "fushah" | "amiyah"`) consumed by `path-explorer` and `dashboard-tracks` (which filters the dashboard to the selected track card); edit-profile success dispatches `lughati:account-tab` (`detail: "profil"`) handled by `account-settings-tabs`. Model version is context-only — `TalaqqiModelProvider` → `useTalaqqiModel()` used by `ModelPipelineSelect`, `ModelText`, and the verification stream; the v4.1 profile hides Amiyah rows.
- `add-vocabulary-flow.tsx` opens from `+ Tambah Kosakata Saya` on `/admin` and `+ Tambah Mufrodat Baru` on `/admin/kurikulum-dan-mufrodat`; entries live only in the global provider's memory and appear in both the admin bank and dashboard catalog. All tabs, filters, dialogs, notices, mocks, and demo saves change local UI state only — no API, storage, audio, microphone, recording, upload/download, payment, email, or config persistence.

## Content source

- Change canonical content in `../lughati/` first, then mirror only what the landing page shows. All content is `review`, audio is not recorded, and there are no real testimonials. `../lughati/AGENTS.md` still points at a `web/` subdir that no longer exists.
