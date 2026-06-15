# Velocaris — E-Commerce Platform Documentation

A full-stack e-commerce application for vehicles (cars & motorcycles), built with **Next.js (App Router)** on the frontend and **NestJS + PostgreSQL (Prisma)** on the backend.

- **Live demo:** https://velocaris.vercel.app
- **API:** https://ecommerce-react-production-577a.up.railway.app

---

## 1. Tech Stack

### Frontend
- **Next.js 14** (App Router, TypeScript + JSX)
- **Zustand** for state management (cart, liked items, auth, UI/drawer state)
- **Tailwind CSS** for styling
- **Material UI** (checkout form components)
- **Recharts** for admin analytics dashboards
- **Stripe.js** (loaded, payment integration scaffolded but not yet wired to a live charge)

### Backend
- **NestJS 11** (TypeScript)
- **PostgreSQL** via **Prisma ORM**
- **JWT** authentication (via `@nestjs/jwt` + Passport)
- **bcryptjs** for password hashing
- **class-validator** for request validation

### Infrastructure
- **Frontend hosting:** Vercel
- **Backend + database hosting:** Railway (Nixpacks build, Postgres add-on)
- Migrations run automatically on deploy via `npx prisma migrate deploy`

---

## 2. Core Features

### Storefront (Customer-facing)
- Product catalogue with category filters, search modal, and featured products
- Animated hero showcase with scroll-linked transitions
- Product detail pages with image galleries
- "Liked" items / wishlist (per-user, persisted)
- Cart (persisted in localStorage)
- Checkout flow (address + payment form) → creates an order
- Order history page (`/orders`)
- Authentication: register/login via global slide-out drawers, JWT stored in cookies

### Admin Panel (`/admin`)
- **Overview** — analytics dashboard (revenue trends, order stats, low-stock alerts, category breakdowns via charts)
- **Products** — create, edit, delete, restore, and manage stock/pricing
- **Orders** — view and manage all customer orders
- **Users** — manage user accounts and roles
- **Approvals** — review pending approval requests from admins

### Role-Based Access Control
Three-tier role hierarchy enforced via NestJS guards:

| Role | Permissions |
|---|---|
| `CUSTOMER` | Browse, purchase, view own orders |
| `ADMIN` | Manage products, orders, users — but sensitive actions require approval |
| `SUPERADMIN` | Full access, including approving/rejecting admin actions |

### Approval Workflow
To prevent a single admin from making unilateral changes, the following admin actions create an `ApprovalRequest` that a SUPERADMIN must approve or reject:
- Creating a product
- Deleting a product
- Changing a product's price
- Promoting a user to admin
- Demoting an admin
- Cancelling an order

### Soft Delete / Restore
Products are **soft-deleted** (a `deletedAt` timestamp is set, not removed from the database) so existing orders that reference them remain valid. Admins can restore soft-deleted products, or re-create hard-deleted seed products via a one-click "Re-add missing" action.

---

## 3. Project Structure

```
ecommerce-react/
├── app/                    # Next.js App Router pages
│   ├── page.jsx            # Home page
│   ├── product/[id]/       # Product detail page
│   ├── cart/                # Cart page
│   ├── checkout/            # Checkout flow
│   ├── orders/              # Customer order history
│   ├── liked/                # Wishlist page
│   ├── login/, register/    # Auth pages
│   └── admin/                # Admin panel (products, orders, users, approvals)
├── components/             # Shared React components
├── store/                  # Zustand stores (cart, liked, auth, UI)
├── lib/                    # Helpers/utilities
├── hooks/                  # Custom React hooks
├── middleware.ts           # Route protection (auth cookies)
├── public/, assets/        # Static assets
│
└── backend/
    ├── src/
    │   ├── auth/            # JWT auth, guards, strategies, decorators
    │   ├── users/            # User management
    │   ├── products/         # Product CRUD + soft delete
    │   ├── orders/            # Order placement & management
    │   ├── approvals/         # Approval request workflow
    │   ├── analytics/         # Dashboard data endpoints
    │   ├── ai/                 # AI-related endpoints (Gemini integration)
    │   └── prisma/             # Prisma service/module
    ├── prisma/
    │   ├── schema.prisma     # Database schema
    │   ├── migrations/        # Migration history
    │   └── seed.ts            # Seed data script
    └── railway.json          # Railway deploy config
```

---

## 4. Data Model (Prisma Schema)

- **User** — `id, email, password (hashed), name, role (CUSTOMER/ADMIN/SUPERADMIN)`
- **Product** — `id, name, description, price, image, images[], category, stock, featured, badge, features[], deletedAt`
- **Order** — `id, userId, status (PENDING/PAID/SHIPPED/DELIVERED/CANCELLED), total, hiddenByUser`
- **OrderItem** — links an `Order` to a `Product` with `quantity` and `price` at time of purchase
- **ApprovalRequest** — `type, status (PENDING/APPROVED/REJECTED), requestedBy, payload, reason, note`

---

## 5. Environment Variables

### Frontend (`.env` / `.env.local`)
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe publishable key (for future payment integration) |
| `NEXT_PUBLIC_CHEC_PUBLIC_KEY` | Commerce.js public key (legacy, leftover from initial scaffold) |

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `GEMINI_API_KEY` | Google Gemini API key (used by the `ai` module) |
| `PORT` | Port the API listens on (default `3001`) |
| `FRONTEND_URL` | Allowed CORS origin for production frontend |

---

## 6. Local Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or hosted, e.g. Railway/Supabase)

### 1. Backend
```bash
cd backend
npm install
# Create .env with DATABASE_URL, JWT_SECRET, PORT=3001, etc.
npx prisma migrate deploy   # apply migrations
npx prisma db seed          # (optional) seed sample products
npm run start:dev           # runs on http://localhost:3001
```

### 2. Frontend
```bash
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev                 # runs on http://localhost:3000
```

---

## 7. Deployment

### Backend (Railway)
- Build: Nixpacks (auto-detected from `backend/package.json`)
- Deploy command (`railway.json`): `npx prisma migrate deploy && node dist/src/main`
  - Migrations are applied automatically on every deploy
- Requires `DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `FRONTEND_URL` env vars set in Railway

### Frontend (Vercel)
- Auto-deploys from the `main` branch
- Requires `NEXT_PUBLIC_API_URL` pointing to the Railway backend, plus Stripe/Commerce.js keys

---

## 8. Known Gaps / Roadmap

These are not implemented yet and represent natural next steps for a buyer/new owner:

- **Live Stripe payments** — checkout currently records orders without verifying payment; Stripe keys are present but not wired to a real charge
- **User profile page** — no self-service flow to change name/email/password
- **Password reset / forgot password**
- **Order confirmation emails**
- **Pagination** — product, order, and user lists currently load everything at once
- **AI-powered admin insights** — `ai` module exists but is not yet surfaced in the dashboard
- **PDF export** for orders/analytics

---

## 9. Support / Handover Notes

- The codebase follows standard Next.js App Router and NestJS module conventions — any developer familiar with these frameworks can onboard quickly.
- All sensitive admin actions are gated by the approval workflow (see Section 2), which is the main piece of "custom business logic" beyond a typical e-commerce CRUD app.
- Database migrations are version-controlled in `backend/prisma/migrations/` — always run `prisma migrate deploy` (not `db push`) in production.
