create or replace function private.is_passageway_staff(required_role text default 'editor')
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where (select auth.uid()) is not null
      and lower(email) = lower(coalesce((select auth.jwt()) ->> 'email', ''))
      and active = true
      and deleted_at is null
      and (role = 'admin' or required_role = 'editor')
  );
$$;

revoke all on function private.is_passageway_staff(text) from public;
grant execute on function private.is_passageway_staff(text) to anon, authenticated;

drop policy if exists "staff can read own admin profile" on public.admin_users;
create policy "staff can read own admin profile"
on public.admin_users for select to authenticated
using (
  lower(email) = lower(coalesce((select auth.jwt()) ->> 'email', ''))
  or private.is_passageway_staff('admin')
);
