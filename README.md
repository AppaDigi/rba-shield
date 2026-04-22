# RBA Shield

RBA Shield is the public marketing site plus a secure Supabase-backed member and attorney portal for legal aid intake, communication, and document handling.

## Portal Features

- Role-based login for `RBA Member` and `Shield Attorney`
- Member dashboard for submitting and tracking legal aid requests
- Attorney dashboard for filtering, claiming, updating, and responding to requests
- Thread-style communication on each request
- Private file uploads via Supabase Storage
- Row-level security policies for request, message, and file isolation

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

3. Run the SQL migration in Supabase:

```bash
supabase/migrations/20260422_rba_shield_portal.sql
```

4. Make sure each auth user has `app_metadata.portal_role` set to either `member` or `attorney`, and that the same `auth.users.id` exists in the matching profile table:

- `public.members`
- `public.attorneys`

Each profile should include a unique `username`, which is what the login form can resolve before signing the user in with Supabase Auth.

## Running Locally

```bash
npm run dev
```

Open `http://localhost:3000` for the main site and `http://localhost:3000/login` for the secure portal login.

## Verification

```bash
npm run lint
npm run build
```
