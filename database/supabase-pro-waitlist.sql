create table if not exists public.pro_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message text not null check (char_length(message) between 10 and 2000),
  page_url text,
  user_agent text,
  status text not null default 'new' check (status in ('new', 'contacted', 'invited', 'converted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.pro_waitlist enable row level security;

-- Pro waitlist entries are inserted by the Next.js server API route.
-- Keep browser clients from reading or writing this table directly.
