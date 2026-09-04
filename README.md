# Soft Beans Palace

Website for Soft Beans Palace — a food business in Port Harcourt, Nigeria
specializing in soft beans dishes, sides, and proteins.

Phase 1 is a frontend + WhatsApp ordering experience: customers browse the
menu, build and configure their meals, review their order, and send it to the
business over WhatsApp.

## Tech stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- shadcn/ui primitives (Base UI)
- Zustand (cart state, persisted to localStorage)
- React Hook Form + Zod (checkout validation)
- Motion (purposeful animation)
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Business information (WhatsApp number, phone, Instagram, location, hours)
lives in `src/config/site.ts`, which reads from environment variables.
Copy `.env.example` to `.env.local` and fill in the real values.

The WhatsApp number must be in international format without `+` or spaces
(e.g. `2348012345678`). A local-format Nigerian number (leading `0`) is
normalized automatically when the WhatsApp link is built.

## Menu and prices

Menu items, categories, and prices are the single source of truth in:

- `src/data/menu.ts` — dishes, descriptions, categories, prices (numeric)
- `src/data/categories.ts` — Beans, Sides, Proteins

To change a price, edit the numeric `price` value in `src/data/menu.ts`.
It flows automatically to the menu, food details, cart, checkout, and the
WhatsApp order message. Prices are formatted through `src/lib/currency.ts`;
never hardcode formatted prices in components.

Prices are currently unconfirmed (`0`) — the UI shows "Price on request"
until the owner provides them. Do not invent prices.

## Ordering flow

1. Browse the menu (`/menu`) and search or filter by category.
2. Open a dish, choose sides/proteins, quantity, and per-meal instructions.
3. Review the configured meals in the cart (`/cart`) or the cart drawer.
4. Complete checkout with customer and delivery details.
5. Review the generated order message and continue on WhatsApp — the order
   is only placed once the customer sends the WhatsApp message.

Each configured meal (main dish + extras + instructions) is an independent
cart line. Identical configurations merge; different configurations stay
separate.

## Project structure

```
src/
├── app/            # Routes (kept thin)
├── components/
│   ├── layout/     # Navbar, mobile nav, footer
│   ├── shared/     # Section container/heading, sticker, doodle, reveal
│   └── ui/         # shadcn/ui primitives
├── config/         # Business configuration (site.ts)
├── data/           # Static data (menu, categories, navigation)
├── features/       # home, menu, cart, checkout — each owns its logic
├── hooks/
├── lib/            # cn, currency formatting
└── types/          # Domain types (menu, cart, common)
```

The design system and product decisions are documented in `design.md`,
`architecture.md`, `implementation.md`, and `conventions.md`.
