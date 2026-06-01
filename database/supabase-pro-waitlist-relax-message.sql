alter table public.pro_waitlist
  alter column message drop not null;

alter table public.pro_waitlist
  drop constraint if exists pro_waitlist_message_check;
