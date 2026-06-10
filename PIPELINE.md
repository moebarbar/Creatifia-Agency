# Créatifia — Client Pipeline, CRM & Payments

This document explains the client onboarding pipeline, the CRM, the Stripe
billing model, and how to set everything up on Railway.

---

## 1. What this is

Créatifia sells a **$799/month website subscription**. This system lets clients
sign up, tell us about their business, book a call, and pay — and gives the team
a CRM to manage every client through the pipeline.

The whole flow lives inside the existing app (Express + Postgres + React).

---

## 2. The pipeline

Every client has one **engagement** that moves through these stages:

| Stage | What happens | Who acts |
|-------|--------------|----------|
| `signed_up` | Client creates an account | Client |
| `brief_in_progress` | Multi-step business questionnaire — **autosaved every step**, even if incomplete | Client |
| `brief_complete` | Brief submitted (all required fields) | Client |
| `call_scheduled` | Client books a discovery (Zoom) call | Client |
| `awaiting_payment` | After the call, client returns to pay | Client |
| `active` | $799/mo subscription confirmed (Stripe webhook) | System |
| `in_design` | Team builds the first draft (5 business days) | Staff |
| `in_revision` | Feedback loop | Both |
| `launched` | Site is live; unlimited updates continue | Staff |
| `cancelled` | Subscription cancelled | System/Staff |

**When is payment collected?** After the brief is complete and the call is
booked. No design work begins until the subscription is `active`. Clients can log
out and back in at any point — all progress (including a half-finished brief) is
saved.

The brief itself is defined in [`shared/brief-questions.ts`](shared/brief-questions.ts).
Each step carries explanatory copy and a concrete example so clients understand
what we're asking and why.

---

## 3. Architecture

```
shared/
  schema.ts            Drizzle tables (users, engagements, briefs, meetings,
                       subscriptions, payments, activity_log, …)
  brief-questions.ts   The multi-step brief definition (shared client+server)
  pipeline.ts          Stage display metadata + ordering
server/
  env.ts               Zod-validated environment config (fails fast)
  auth.ts              passport-local + Postgres-backed sessions + role guards
  storage.ts           All DB access (DatabaseStorage)
  stripe.ts            Stripe client, checkout, customer portal
  email.ts             Brevo transactional email + pipeline templates
  migrate.ts           Migration runner (production-safe)
  routes/
    public.ts          Portfolio / contact / blog (unauthenticated)
    auth.ts            register / login / logout / me
    engagement.ts      brief autosave + submit, meeting scheduling (client)
    payments.ts        checkout session, billing portal, history (client)
    webhooks.ts        Stripe webhook (idempotent, raw body)
    admin.ts           CRM: list/filter, detail, stage/assignment, notes (staff)
client/src/
  hooks/use-auth.tsx   session + login/register/logout
  pages/auth.tsx       login / signup
  pages/dashboard.tsx  pipeline stepper + stage-driven action card + scheduling
  pages/dashboard-brief.tsx     autosaving multi-step wizard
  pages/dashboard-payment.tsx   Stripe return page
  pages/admin.tsx      CRM kanban board + detail drawer
```

### Roles
`client` (default), `staff`, `admin`. Staff & admin can access the CRM at
`/admin`. Promote a user with SQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'you@creatifia.com';
```

---

## 4. Stripe

- **Model:** hosted Stripe Checkout in `subscription` mode ($799/mo).
- **Manage/cancel:** Stripe Customer Portal (`/api/payments/portal`).
- **Webhooks** (`/api/webhooks/stripe`): `checkout.session.completed`,
  `customer.subscription.*`, `invoice.paid`, `invoice.payment_failed`. Every
  event is recorded for idempotency before processing, so retries are safe.
- The webhook route is mounted **before** `express.json()` because Stripe
  signature verification needs the raw request body.

If Stripe env vars are absent the payment endpoints return `503` and the rest of
the app still runs — so you can develop without keys.

---

## 5. Email (Brevo)

All transactional email goes through **Brevo** (`server/email.ts`). Without
`BREVO_API_KEY` set, emails are logged to the console instead of sent.
Touchpoints: welcome, brief reminder, call confirmation, payment receipt, and
admin new-lead/stage notifications.

---

## 6. Setup on Railway

1. **Add Postgres** — Railway → New → Database → PostgreSQL. `DATABASE_URL` is
   injected automatically.
2. **Set environment variables** (Railway → Variables) — see
   [`.env.example`](.env.example): `SESSION_SECRET`, `APP_URL`,
   `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`,
   `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `ADMIN_NOTIFY_EMAIL`.
3. **Run migrations** — set Railway's *pre-deploy command* to:
   ```
   node dist/migrate.cjs
   ```
   (or run `npm run db:migrate` once locally against the Railway DB).
4. **Build & start** — Railway uses `npm run build` then `npm run start`.
5. **Stripe:**
   - Create a recurring **$799/month** Price → copy its id into `STRIPE_PRICE_ID`.
   - Add a webhook endpoint → `https://<APP_URL>/api/webhooks/stripe`, subscribe
     to the events listed above → copy the signing secret into
     `STRIPE_WEBHOOK_SECRET`.
6. **Make yourself admin** with the SQL above, then visit `/admin`.

---

## 7. Local development

```bash
cp .env.example .env      # fill in at least DATABASE_URL
npm install
npm run db:migrate        # or npm run db:push for rapid iteration
npm run dev               # http://localhost:5000
```

Stripe webhooks locally: `stripe listen --forward-to localhost:5000/api/webhooks/stripe`.
