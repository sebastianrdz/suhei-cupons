-- Add redeemed column to coupons table
alter table public.coupons
  add column if not exists redeemed boolean not null default false;

-- Allow guests (anon) to toggle the redeemed field
create policy "Guest update redeemed"
  on public.coupons for update
  to anon
  using (true) with check (true);
