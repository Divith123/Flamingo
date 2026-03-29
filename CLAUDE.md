# flamingo

This file provides strict context and rules for ALL AI assistants working in this codebase. Read this BEFORE making any changes.

## Project Overview

- **Ecosystem**: TypeScript (strict mode)
- **Runtime**: Bun
- **Package Manager**: Bun (`bun@1.3.11`)
- **Monorepo**: Turborepo with workspace packages (`apps/*`, `packages/*`)
- **Linter/Formatter**: Biome (NO eslint, prettier, or other tools)

## Project Structure

```
flamingo/
├── apps/
│   ├── web/           # Next.js 16 web app + Tauri 2 desktop app
│   ├── native/        # Expo 55 React Native mobile app
│   ├── server/        # Hono API server (Bun runtime)
│   └── fumadocs/      # Fumadocs documentation site
├── packages/
│   ├── api/           # tRPC router definitions (@flamingo/api)
│   ├── auth/          # Better Auth configuration (@flamingo/auth)
│   ├── db/            # Drizzle ORM schema + client (@flamingo/db)
│   ├── env/           # Environment config per target (@flamingo/env)
│   └── config/        # Shared TypeScript config (@flamingo/config)
```

## Complete Tech Stack

### Frontend — Web (`apps/web`)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16 |
| Desktop | Tauri | 2.10 |
| CSS | Tailwind CSS | 4 |
| UI Components | shadcn/ui (radix-vega style) | latest |
| Icons | @hugeicons/react | latest |
| State | Zustand | 5 |
| Forms | TanStack Form | 1 |
| API Client | tRPC + TanStack Query | v11 + v5 |
| Animations | Motion (Framer Motion) | 12 |
| CMS | Payload | 3 |
| Payments (client) | @stripe/react-stripe-js | 6 |
| Uploads | UploadThing | 7 |
| Components | Storybook | 10 |

### Frontend — Native (`apps/native`)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Expo | 55 |
| Routing | Expo Router (file-based) | latest |
| Styling | react-native-unistyles | 3 |
| Animations | react-native-reanimated | 4 |
| Gestures | react-native-gesture-handler | latest |
| Navigation | @react-navigation (drawer + tabs) | 7 |
| Auth Storage | expo-secure-store | latest |
| API Client | tRPC + TanStack Query | v11 + v5 |

### Backend (`apps/server`)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Hono | 4 |
| Runtime | Bun | latest |
| API | tRPC (via @hono/trpc-server) | v11 |
| Auth | Better Auth (with drizzle adapter) | 1.5 |
| Database | Drizzle ORM + PostgreSQL | latest |
| Effect | Effect + @effect/schema | 3 |
| Payments | Stripe | 17 |
| Email | Resend + React Email | latest |
| Realtime | Socket.io | 4 |
| Job Queue | BullMQ | 5 |
| Search | MeiliSearch | latest |
| Caching | Upstash Redis | latest |
| File Storage | Cloudflare R2 (via AWS S3 SDK) | latest |
| AI | Vercel AI SDK | latest |
| Logging | Pino | 10 |
| Error Tracking | Sentry | 10 |
| Uploads | UploadThing | 7 |

### Database

- **Engine**: PostgreSQL 16
- **ORM**: Drizzle
- **DB Setup**: Supabase
- **Commands**: `bun db:push`, `bun db:generate`, `bun db:migrate`, `bun db:studio`

### Shared Packages

| Package | Purpose | Exports |
|---------|---------|---------|
| `@flamingo/api` | tRPC routers + procedures | `router`, `publicProcedure`, `protectedProcedure` |
| `@flamingo/auth` | Better Auth instance | `auth` (with drizzle adapter, expo plugin, stripe) |
| `@flamingo/db` | Drizzle client + schema | `db`, `schema/*` |
| `@flamingo/env/server` | Server env validation | Zod-validated server env vars |
| `@flamingo/env/web` | Web env validation | Zod-validated web env vars |
| `@flamingo/env/native` | Native env validation | Zod-validated native env vars |
| `@flamingo/config` | Shared TS config | `tsconfig.base.json` |

### Environment Variables

- **Server** (`@flamingo/env/server`): `DATABASE_URL`, `BETTER_AUTH_SECRET` (min 32 chars), `BETTER_AUTH_URL`, `CORS_ORIGIN`, `NODE_ENV`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LOG_LEVEL`, `PINO_PRETTY`, `SENTRY_DSN`, `SENTRY_ENVIRONMENT`, `SENTRY_TRACES_SAMPLE_RATE`, `SENTRY_PROFILES_SAMPLE_RATE`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `MEILISEARCH_HOST`, `MEILISEARCH_API_KEY`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `PAYLOAD_SECRET`
- **Web** (`@flamingo/env/web`): `NEXT_PUBLIC_SERVER_URL`
- **Native** (`@flamingo/env/native`): `EXPO_PUBLIC_SERVER_URL`

### Testing

- **Unit Tests**: Vitest (config at `apps/web/vitest.config.ts`)
- **E2E Tests**: Playwright (config at root, test dir: `apps/web/e2e`)
- **Component Tests**: Storybook (port 6006, stories in `src/components/ui/`)
- **Test Runners**: `bun test`, `bun test:e2e`
- **Coverage**: `bunx vitest run --coverage`
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)

### Build & Deploy

- **Web**: Docker (multi-stage build, Next.js standalone with PPR)
- **Server**: Docker (oven/bun:1-slim, tsdown build)
- **Orchestration**: `docker-compose.yml` (web, server, postgres, redis)
- **CI/CD**: GitHub Actions (lint → typecheck → test → e2e → build)
- **Linter**: `biome check --write .` (run AFTER every change)

## Common Commands

```bash
bun install              # Install all dependencies
bun dev                  # Start all apps in dev mode
bun dev:web              # Start web app only (port 3001)
bun dev:native           # Start Expo dev server
bun dev:server           # Start Hono server (hot reload)
bun build                # Build all apps
bun check-types          # TypeScript type checking (all packages)
bun check                # Run Biome linter/formatter
bun test                 # Run all tests (via Turborepo)
bun test:e2e             # Run Playwright E2E tests
bun db:push              # Push Drizzle schema to database
bun db:generate          # Generate Drizzle migrations
bun db:migrate           # Run Drizzle migrations
bun db:studio            # Open Drizzle Studio
```

## STRICT RULES — MUST FOLLOW

### Rule 1: Runtime & Package Manager

- **ALWAYS** use `bun`. **NEVER** use `npm`, `yarn`, or `pnpm`.
- All commands: `bun <command>`, `bunx <package>`, `npx` is acceptable for CLI tools.
- Package scripts use `turbo` (Turborepo) with `-F` filter for targeting specific apps.

### Rule 2: Linting & Formatting (Biome)

- **ALWAYS** run `bun check` after making file changes.
- **NEVER** use eslint, prettier, or any other linter/formatter.
- Biome config in `biome.json` enforces:
  - 2-space indentation (spaces, not tabs)
  - Double quotes in JavaScript/TypeScript
  - Organized imports (auto-sorted)
  - Self-closing JSX elements (`<Component />`)
  - `Number.isNaN()` over global `isNaN()`
  - `as const` assertions
  - Sorted Tailwind classes (via `useSortedClasses` nursery rule for `cn`, `clsx`, `cva`)
  - No unused template literals
  - No inferrable types
  - No useless else blocks

### Rule 3: TypeScript Rules

- **Strict mode** is enabled. No `any`. No `@ts-ignore`. No `@ts-expect-error` without justification.
- `verbatimModuleSyntax: true` — use `import type` for type-only imports.
- `noUncheckedIndexedAccess: true` — always check indexed access results.
- `noUnusedLocals: true`, `noUnusedParameters: true` — clean up dead code.
- Target is `ESNext` with `bundler` module resolution.
- All packages extend `@flamingo/config/tsconfig.base.json`.

### Rule 4: Monorepo Package Conventions

- Use `workspace:*` for internal package dependencies.
- Package exports use `type: "module"` and `"."` export maps.
- **NEVER** import from a package's internal files. Use public exports only.
- Shared config lives in `@flamingo/config`.
- Environment variables are accessed through `@flamingo/env/server`, `@flamingo/env/web`, or `@flamingo/env/native` — **NEVER** raw `process.env`.

### Rule 5: Web App Rules (`apps/web`)

- Use **Next.js App Router** conventions. `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`.
- Server Components by default. Add `"use client"` ONLY when interactive.
- Styling: **Tailwind CSS v4** with `@tailwindcss/postcss`. Use `cn()` utility for class merging.
- shadcn/ui components go in `@/components/ui/`. Import via `shadcn add`.
- API calls: use tRPC client via TanStack Query. **NEVER** raw fetch to the API.
- State: Zustand for global client state. TanStack Query for server state.
- Forms: TanStack Form with Zod validation schemas.
- Payload CMS config at `src/payload.config.ts`. Collections in `src/payload/collections/`.
- Desktop (Tauri): Rust code is in `src-tauri/`. **NEVER** modify Rust files from TS context.
- Storybook: `bun storybook` for component development.

### Rule 6: Native App Rules (`apps/native`)

- Expo Router for file-based routing. Files in `app/` directory.
- Styling: **react-native-unistyles** — **NEVER** use Tailwind CSS in native code.
- Theme defined in `theme.ts` with breakpoints in `breakpoints.ts`. Config in `unistyles.ts`.
- Animations: `react-native-reanimated` v4. **NEVER** use `motion` (Framer Motion) in native.
- Navigation: drawer + tabs via `@react-navigation`.
- Auth: `@better-auth/expo` with `expo-secure-store` for token storage.
- API: tRPC client configured in `utils/trpc.ts` with cookie-based auth headers.
- **NEVER** use web-specific APIs (DOM, window, document) in native code.

### Rule 7: Server Rules (`apps/server`)

- Hono framework. Routes in `src/index.ts` or extend from there.
- tRPC routes via `@hono/trpc-server` mounted at `/trpc/*`.
- Auth endpoints at `/api/auth/*` handled by Better Auth.
- Logging: `pino` via `src/lib/logger.ts`. Use structured logging.
- Error tracking: `@sentry/node` via `src/lib/sentry.ts`.
- Jobs: BullMQ queues in `src/lib/queue.ts`. Workers in `src/lib/workers.ts`.
- Email: Resend + React Email templates in `src/emails/`.
- Search: MeiliSearch client in `src/lib/search.ts`.
- Storage: Cloudflare R2 via AWS S3 SDK in `src/lib/storage.ts`.
- Realtime: Socket.io in server. Socket.io-client in web/native.
- Environment: validate ALL env vars through `@flamingo/env/server`. **NEVER** use raw `process.env`.
- Effect: use `effect` for complex error handling and data transformations where appropriate.

### Rule 8: API Layer Rules (`packages/api`)

- All tRPC routers go in `packages/api/src/routers/`.
- Export `AppRouter` type from `packages/api/src/routers/index.ts`.
- Use `publicProcedure` for unauthenticated routes, `protectedProcedure` for authenticated.
- Context is created in `context.ts` — includes session from Better Auth.

### Rule 9: Database Rules (`packages/db`)

- Drizzle ORM with PostgreSQL. Schema in `packages/db/src/schema/`.
- Never write raw SQL. Use Drizzle query builder.
- Migrations: `bun db:generate` to create, `bun db:migrate` to apply.
- Push changes without migration: `bun db:push`.
- **NEVER** use Drizzle Studio (bun db:studio) in production.

### Rule 10: Authentication Rules (`packages/auth`)

- Better Auth with Drizzle adapter. Config in `packages/auth/src/index.ts`.
- Expo plugin enabled for mobile auth.
- Stripe plugin for payment integration.
- Trusted origins configured for web, native, and Expo dev URLs.
- Cookie attributes: `sameSite: "none"`, `secure: true`, `httpOnly: true`.

### Rule 11: Testing Rules

- Unit tests: Vitest. Run with `vitest` or `bun test`.
- E2E tests: Playwright. Tests in `apps/web/e2e/`. Run with `npx playwright test`.
- Component tests: Storybook interactions.
- Test config: `playwright.config.ts` at root (baseURL: `http://localhost:3001`).
- **NEVER** skip tests. Run tests before marking work as complete.

### Rule 12: Security Rules

- **NEVER** commit `.env` files or secrets. They are in `.gitignore`.
- **NEVER** log secrets, tokens, or passwords.
- **NEVER** expose server-only env vars to the client.
- Use parameterized queries (Drizzle handles this).
- Auth tokens via SecureStore on native, httpOnly cookies on web.
- Stripe webhooks: verify signatures with `constructWebhookEvent`.

### Rule 13: Import Conventions

- Workspace packages: `@flamingo/api`, `@flamingo/auth`, `@flamingo/db`, `@flamingo/env`
- Path aliases in web: `@/` maps to `apps/web/src/`
- Path aliases in native: `@/` maps to `apps/native/`
- Biome auto-organizes imports. Don't manually sort them.

### Rule 14: Deployment

- Docker Compose: `docker-compose.yml` defines web, server, db services.
- Web: Next.js standalone output via multi-stage Dockerfile.
- Server: Bun native compilation (`bun build --compile`).
- Database: PostgreSQL 16 Alpine container.
- **NEVER** modify Docker config without testing the build.

## Product Development Documentation

Comprehensive product development documentation is available in the `docs/` directory. This documentation provides detailed specifications for all 15 Flamingo Business Suite products.

### Documentation Structure (144,000+ words)

```
docs/
├── README.md                          # Documentation index & navigation
├── 01-product-overviews/              # 15 product specifications
│   ├── flamingo-core.md               # Main all-in-one platform
│   ├── flamingo-books.md              # Accounting & financial management
│   ├── flamingo-expense.md            # Expense tracking & reporting
│   ├── flamingo-payroll.md            # Employee salary & payroll
│   ├── flamingo-inventory.md          # Stock & inventory management
│   ├── flamingo-sign.md               # Digital signatures & documents
│   ├── flamingo-billing.md            # Recurring billing & revenue
│   ├── flamingo-commerce.md           # E-commerce & online selling
│   ├── flamingo-practice.md           # Firm & client management
│   ├── flamingo-invoice.md            # Simple invoicing & payments
│   ├── flamingo-checkout.md           # Checkout pages & payment collection
│   ├── flamingo-payments.md           # Global payment gateway
│   ├── flamingo-spend.md              # Business expense control
│   ├── flamingo-erp.md                # Enterprise resource planning
│   └── flamingo-procurement.md        # Sourcing & purchasing
├── 02-competitive-analysis/           # Market research & patterns
│   ├── market-landscape.md            # $800B+ market analysis
│   ├── ui-pattern-analysis.md         # Navigation, dashboard, form patterns
│   ├── feature-comparisons.md         # Feature matrices by tier
│   └── pricing-models.md              # Pricing strategies & recommendations
├── 03-user-onboarding/                # Dashboard & onboarding specs
│   └── unified-dashboard-design.md    # Post-login experience (profile-centered)
├── 07-technical-architecture/         # Platform architecture
│   └── multi-product-architecture.md  # Technical blueprint
└── 08-development-roadmap/            # Implementation planning
    └── priority-matrix.md             # 18-month roadmap
```

### Key Design Specifications

**Unified Dashboard (Post-Login Experience):**
```
┌─────────────────────────────────────────────────────────────┐
│ Flamingo  [Search across all products...]     [🔔] 👤 Jane │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Jane Doe                                 │
│              CFO @ Acme Corporation                         │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │  $2.4M  │ │  +18%   │ │   45    │ │  92%    │          │
│  │  Cash   │ │  MRR    │ │  Tasks  │ │  Margin │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Quick Access                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ 📊 Books │ │ 📦 Inv.  │ │ 💰 Pay   │ │ ✍️  Sign │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│  (All 15 products displayed in grid)                        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Action Items (8 pending)                                   │
│  [Pending approvals, alerts, notifications]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Product Switcher Pattern:**
- Grid layout: 4 columns desktop, 2 tablet, 1 mobile
- AI-sorted by frequency and recency of use
- Pinned favorites at top
- Search with fuzzy matching
- Permission-based visibility

### Development Phases

**Phase 1 (Months 1-6): Foundation**
- Core platform + Books + Invoice + Expense
- Unified dashboard with product grid
- Identity & Access Management
- Basic integrations (Stripe, Plaid)

**Phase 2 (Months 7-12): Enhancement**
- Payroll + Billing + Inventory + Commerce
- Automation engine
- Advanced reporting
- Mobile apps (iOS/Android)

**Phase 3 (Months 13-18): Scale**
- All 15 products
- Enterprise features (multi-entity, consolidation)
- Advanced compliance (SOC 2 Type II)
- Global expansion

### Technical Architecture Alignment

All product development must align with the architecture defined in `docs/07-technical-architecture/multi-product-architecture.md`:

**Shared Services:**
- Identity: Better Auth with Drizzle adapter
- Notifications: Socket.io + Resend
- Search: MeiliSearch
- Queue: BullMQ with Upstash Redis

**Data Integration:**
- Event-driven architecture
- Shared data model (contacts, products, chart of accounts)
- Clear ownership boundaries per product

**Security Requirements:**
- RBAC with granular permissions
- Complete audit trail
- SOC 2 Type II compliance path

### Using the Documentation

**For New Feature Development:**
1. Review relevant product overview in `docs/01-product-overviews/`
2. Check feature specifications in `docs/05-feature-specifications/`
3. Follow UI/UX patterns in `docs/06-ui-ux-patterns/`
4. Align with architecture in `docs/07-technical-architecture/`

**For Competitive Analysis:**
1. Start with `docs/02-competitive-analysis/market-landscape.md`
2. Review UI patterns in `docs/02-competitive-analysis/ui-pattern-analysis.md`
3. Check feature matrices in `docs/02-competitive-analysis/feature-comparisons.md`
4. Reference pricing in `docs/02-competitive-analysis/pricing-models.md`

**Documentation Quality Standards:**
- All documents: 2000+ words minimum
- Consistent structure across all documents
- Research-backed recommendations
- Actionable implementation guidance
- Cross-references between related topics

---

## Maintenance

Update AGENTS.md AND CLAUDE.md when:
- Adding/removing dependencies
- Changing project structure
- Adding new features, services, or packages
- Modifying build/dev workflows
- Adding new environment variables
- Changing coding conventions or linting rules
- **Updating product documentation in `docs/`**

AI assistants MUST suggest updates to both files when they notice relevant changes.

**Before starting any development work:**
1. Check `docs/README.md` for documentation index
2. Review relevant product specifications
3. Ensure alignment with architecture documentation
4. Update documentation if implementing new patterns
