# Humanity Alive Foundation — Website

The website for **Humanity Alive Foundation**, a Karachi-based non-profit that supports children battling cancer, white-collar families going through financial hardship, and elderly community members.

On the site, visitors can:

- read about the foundation, its programs and past projects
- make a **monetary donation** (through EasyPaisa)
- make a **cashless donation** (pledge items like hair strands, homemade snacks, stress balls, hot/cold packs or sanitizers for pickup)
- send a message through the **contact form**, which emails the foundation and sends the visitor a confirmation
- create an account / sign in
- **admins** can sign in and see every donation in a dashboard

---

## Tech stack

| Layer | What's used |
|---|---|
| Frontend | React 18 + TypeScript, built with **Vite** |
| Styling | Tailwind CSS + [shadcn/ui](https://ui.shadcn.com) components (Radix UI) |
| Routing | React Router v6 |
| Data fetching | TanStack React Query |
| Backend | **Supabase** — Postgres database, authentication, and Edge Functions (Deno) |
| Email | [Resend](https://resend.com) (called from a Supabase Edge Function) |
| Payments | EasyPaisa (integration is a **placeholder**, see [Known issues](#known-issues--things-to-fix)) |

The project was originally generated with Lovable (the `vite_react_shadcn_ts` template), which is why there's a large set of ready-made UI components in `src/components/ui/`.

---

## How to run it

### 1. Install the requirements

- **Node.js 18 or newer** (Node 20 or 22 recommended) — download from <https://nodejs.org>. This also installs `npm`.
- Check it worked:
  ```bash
  node -v
  npm -v
  ```

### 2. Unzip and open the folder

```bash
cd humanity-alive-foundation-main
```

### 3. Install the dependencies

```bash
npm install
```

This creates a `node_modules` folder. It only needs to be done once (or again whenever `package.json` changes).

### 4. Start the development server

```bash
npm run dev
```

Then open **<http://localhost:8080>** in your browser. The page reloads automatically whenever you save a file.

Stop the server with `Ctrl + C`.

> The site works straight away because it is already connected to an existing Supabase project (`tswopzusnqbyakkjkefv`). The donation forms, sign-in, admin page and contact form all talk to that live project — so anything you submit locally goes into the real database.

### Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Runs the site locally at http://localhost:8080 with live reload |
| `npm run build` | Builds an optimised production version into the `dist/` folder |
| `npm run preview` | Serves the built `dist/` folder locally so you can test the production build |
| `npm run lint` | Checks the code for problems with ESLint |

### Deploying

`npm run build` produces a static site in `dist/` that can be hosted anywhere (Vercel, Netlify, etc.). The code refers to `https://humanity-alive-foundation.vercel.app`, so it appears to be deployed on **Vercel**. On Vercel: import the project, framework = *Vite*, build command = `npm run build`, output directory = `dist`.

Because the site uses client-side routing, the host must send every path back to `index.html` (Vercel does this automatically for Vite projects; on Netlify add a `_redirects` file with `/* /index.html 200`).

---

## Project structure

```
humanity-alive-foundation-main/
├── index.html                 # HTML shell that loads the React app
├── package.json               # Dependencies and npm scripts
├── vite.config.ts             # Vite config (dev server on port 8080, "@" = src/)
├── tailwind.config.ts         # Tailwind theme (foundation colours etc.)
├── .env                       # Supabase URL / public key (see note below)
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── uploads/               # Images used on the site (logo, photos)
├── src/
│   ├── main.tsx               # Entry point – mounts <App />
│   ├── App.tsx                # All page routes are defined here
│   ├── index.css              # Global styles + Tailwind
│   ├── pages/                 # One file per page / route
│   ├── components/            # Page sections (Header, Hero, Donate, …)
│   │   ├── auth/AuthButton.tsx
│   │   └── ui/                # shadcn/ui building blocks (buttons, cards, dialogs…)
│   ├── hooks/                 # Data + auth logic (Supabase calls)
│   ├── integrations/supabase/ # Supabase client + generated DB types
│   └── lib/utils.ts           # Small helper (class name merging)
└── supabase/
    ├── config.toml            # Supabase project id + function settings
    ├── migrations/            # SQL that sets up the database tables & security
    └── functions/             # Server-side Edge Functions (Deno)
        ├── process-easypaisa-payment/
        ├── verify-easypaisa-payment/
        └── send-contact-email/
```

### Pages (`src/pages/`)

| URL | File | What it shows |
|---|---|---|
| `/` | `Index.tsx` | Home page: hero, about, programs, donate and contact sections |
| `/about` | `AboutPage.tsx` | About the foundation |
| `/programs` | `ProgramsPage.tsx` | Health, Education and Family Upliftment programs, plus achievements (Project C³ — 60 children supported at NICH; Project H² — 10 families helped) |
| `/donate` | `DonatePage.tsx` | Monetary and cashless donation forms |
| `/contact` | `ContactPage.tsx` | Contact details and contact form |
| `/auth` | `AuthPage.tsx` | Sign up / sign in |
| `/admin` | `AdminPage.tsx` | Admin dashboard (only for users with the `admin` role) |
| `/thank-you` | `ThankYou.tsx` | Shown after a successful payment |
| `/donation-cancelled` | `DonationCancelled.tsx` | Shown if a payment fails or is cancelled |
| anything else | `NotFound.tsx` | 404 page |

The About, Programs, Donate and Contact pages are thin wrappers: each one renders `Header`, the matching component from `src/components/`, and `Footer`.

### Main components (`src/components/`)

- **Header / Footer** — navigation bar (Home, About, Programs, Donate, Contact, Admin) and footer with links and social media (Facebook, Instagram).
- **Hero, About, Programs** — the content sections of the site.
- **Donate** — tabbed form: *Monetary Donation* (amount from PKR 500 upward, category, donor details → EasyPaisa) and *Cashless Donation* (renders `ItemDonationForm`).
- **ItemDonationForm** — form to pledge items for pickup; saves a row to the `item_donations` table.
- **DonationDialog** — pop-up version of the monetary donation form, opened from the Contact section.
- **Contact** — contact form that calls the `send-contact-email` function; the "volunteer" button sends people to `/auth`.
- **auth/AuthButton** — sign-in / sign-up / sign-out box used on the admin page.

### Hooks (`src/hooks/`)

- **useAuthUser** — tracks the signed-in user and loads their `profiles` row; exposes `isAdmin` (true when `role = 'admin'`).
- **useMonetaryDonations** — `useProcessEasypaisaPayment()` calls the `process-easypaisa-payment` function and redirects the browser to the payment URL it returns.
- **useItemDonations** — `useCreateItemDonation()` inserts a cashless donation into `item_donations`.
- **use-toast / use-mobile** — UI helpers (toast notifications, mobile screen detection).

---

## How the main features work

### Monetary donation (EasyPaisa)

1. The visitor fills in the amount, category, name, email and phone on `/donate`.
2. The browser calls the Supabase Edge Function **`process-easypaisa-payment`**.
3. That function saves a row in the `donations` table with `payment_status = 'pending'` and a generated `transaction_id`, then returns an EasyPaisa payment URL.
4. The browser is redirected to EasyPaisa.
5. EasyPaisa is supposed to call back to **`verify-easypaisa-payment`**, which marks the donation `completed` or `failed` and redirects the visitor to `/thank-you` or `/donation-cancelled`.

### Cashless (item) donation

The form inserts directly into the `item_donations` table. Each pledge has a status: `pending → confirmed → collected → completed` (or `cancelled`).

### Contact form

The form posts to the **`send-contact-email`** function, which uses Resend to send:
- the message to **foundationhumanityalive@gmail.com**, and
- a "thank you for contacting us" confirmation to the visitor.

### Accounts and the admin dashboard

- Signing up creates a Supabase Auth user. A database trigger (`on_auth_user_created`) automatically creates a matching row in `profiles` with `role = 'user'`.
- `/admin` checks the profile's role. Only `admin` users see the dashboard, which lists all monetary donations and all item donations in tabs.
- Database security rules (Row Level Security) make sure only admins can read the donation tables.

**To make someone an admin**, they first sign up on the site, then you run this in the Supabase dashboard → *SQL Editor*:

```sql
update public.profiles
set role = 'admin'
where email = 'their-email@example.com';
```

---

## Database (Supabase)

| Table | Purpose |
|---|---|
| `donations` | Monetary donations: donor details, amount, category, payment method, `payment_status`, `transaction_id`, `easypaisa_reference` |
| `item_donations` | Cashless pledges: donor details, `item_type`, quantity, pickup address, preferred pickup date, status, notes |
| `profiles` | One row per signed-up user: email, full name, `role` (`user` or `admin`) |

Helper SQL functions: `is_admin(user_id)`, `get_user_role(user_id)`, `update_updated_at_column()` (keeps `updated_at` current) and `handle_new_user()` (creates the profile on sign-up).

The full TypeScript description of the schema is in `src/integrations/supabase/types.ts`.

---

## Configuration and secrets

### Frontend

The Supabase URL and **public (anon) key** are in `.env`, but note that the code does **not** actually read `.env` — the same values are hard-coded in:

- `src/integrations/supabase/client.ts`
- `src/components/Contact.tsx` (the contact form URL and key)

The anon key is designed to be public, so having it in the code is normal for Supabase. If you ever move to a different Supabase project, update **both** of those files (or change them to use `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`).

### Edge Function secrets (set in Supabase → Project Settings → Edge Functions → Secrets)

| Secret | Used by | Purpose |
|---|---|---|
| `SUPABASE_URL` | payment functions | Provided automatically by Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | payment functions | Provided automatically by Supabase |
| `RESEND_API_KEY2` | `send-contact-email` | Your Resend API key (note the `2` in the name) |
| `SITE_URL` | `verify-easypaisa-payment` | Live site address used for redirects; defaults to `https://humanity-alive-foundation.vercel.app` |

---

## Working on the backend (optional)

You only need this if you want to change the database or Edge Functions. Install the [Supabase CLI](https://supabase.com/docs/guides/cli), then:

```bash
supabase login
supabase link --project-ref tswopzusnqbyakkjkefv     # needs access to the Supabase project

# deploy / update the server functions
supabase functions deploy process-easypaisa-payment --no-verify-jwt
supabase functions deploy verify-easypaisa-payment --no-verify-jwt
supabase functions deploy send-contact-email

# set a secret
supabase secrets set RESEND_API_KEY2=re_xxxxxxxx
```

To set up a **brand-new** Supabase project, read the migration notes below first — the migrations in this folder won't run cleanly on an empty database as they are.

---

## Known issues / things to fix

These came up while reviewing the code. The site builds and runs, but some features aren't production-ready yet.

1. **EasyPaisa payments are not really connected.** `process-easypaisa-payment` builds a URL with placeholder values (`storeId=YOUR_STORE_ID`, `merchantHashedReq=HASHED_REQUEST`, return URLs on `yourapp.com`). Real payments won't go through until it's wired up with the foundation's EasyPaisa merchant credentials, a real hashed request, and the live return/cancel URLs. Also, `verify-easypaisa-payment` trusts the `status` in the URL without checking with EasyPaisa, so anyone could mark a donation as completed — it needs proper verification before going live.

2. The production JavaScript bundle is ~650 KB; Vite warns about it. Lazy-loading pages would make the first load faster, though it's not urgent.

---

## Contact

Humanity Alive Foundation — Karachi, Pakistan
foundationhumanityalive@gmail.com
[Facebook](https://www.facebook.com/people/Humanity-Alive-Foundation/61565742686077/) · [Instagram](https://www.instagram.com/humanityalivefoundation/)
