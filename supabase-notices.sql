create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  content text,
  date date not null default current_date,
  category text not null check (
    category in (
      'bidding',
      'careers',
      'exhibitions',
      'others'
    )
  ),
  location text,
  attachment_name text,
  attachment_url text,
  attachment_path text,
  attachments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.notices
add column if not exists attachment_name text,
add column if not exists attachment_url text,
add column if not exists attachment_path text,
add column if not exists attachments jsonb not null default '[]'::jsonb;

update public.notices
set attachments = jsonb_build_array(
  jsonb_build_object(
    'name', attachment_name,
    'url', attachment_url,
    'path', attachment_path
  )
)
where jsonb_array_length(attachments) = 0
  and attachment_name is not null
  and attachment_url is not null;

alter table public.notices
drop constraint if exists notices_category_check;

update public.notices
set category = case
  when category = 'trade-exhibition' then 'exhibitions'
  when category in ('bidding', 'careers', 'exhibitions', 'others') then category
  else 'others'
end;

alter table public.notices
add constraint notices_category_check
check (category in ('bidding', 'careers', 'exhibitions', 'others'));

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists notices_set_updated_at on public.notices;
create trigger notices_set_updated_at
before update on public.notices
for each row
execute function public.set_updated_at();

alter table public.notices enable row level security;

grant select on public.notices to anon;
grant select, insert, update, delete on public.notices to authenticated;

drop policy if exists "Public can read notices" on public.notices;
create policy "Public can read notices"
on public.notices
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can create notices" on public.notices;
create policy "Authenticated users can create notices"
on public.notices
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update notices" on public.notices;
create policy "Authenticated users can update notices"
on public.notices
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete notices" on public.notices;
create policy "Authenticated users can delete notices"
on public.notices
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public, file_size_limit)
values ('notice-files', 'notice-files', true, 10485760)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

drop policy if exists "Public can read notice files" on storage.objects;
create policy "Public can read notice files"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'notice-files');

drop policy if exists "Authenticated users can upload notice files" on storage.objects;
create policy "Authenticated users can upload notice files"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'notice-files');

drop policy if exists "Authenticated users can update notice files" on storage.objects;
create policy "Authenticated users can update notice files"
on storage.objects
for update
to authenticated
using (bucket_id = 'notice-files')
with check (bucket_id = 'notice-files');

drop policy if exists "Authenticated users can delete notice files" on storage.objects;
create policy "Authenticated users can delete notice files"
on storage.objects
for delete
to authenticated
using (bucket_id = 'notice-files');
