-- Before running: replace admin@example.com below with the exact email you
-- will use to sign in. Keep public signups disabled in Supabase Auth.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  live_url text not null default '',
  github_url text not null default '',
  accent jsonb not null default '["#7c3aed", "#06b6d4"]'::jsonb,
  image_url text not null default '',
  tags text[] not null default '{}',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.hackathons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  long_description text not null default '',
  event_date date,
  photos jsonb not null default '[]'::jsonb,
  links jsonb not null default '[]'::jsonb,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.hackathons enable row level security;

drop policy if exists "Anyone can read portfolio hackathons" on public.hackathons;
create policy "Anyone can read portfolio hackathons"
  on public.hackathons for select using (true);

drop policy if exists "Portfolio admin can insert hackathons" on public.hackathons;
create policy "Portfolio admin can insert hackathons"
  on public.hackathons for insert to authenticated
  with check ((select auth.jwt() ->> 'email') = 'admin@example.com');

drop policy if exists "Portfolio admin can update hackathons" on public.hackathons;
create policy "Portfolio admin can update hackathons"
  on public.hackathons for update to authenticated
  using ((select auth.jwt() ->> 'email') = 'admin@example.com')
  with check ((select auth.jwt() ->> 'email') = 'admin@example.com');

drop policy if exists "Portfolio admin can delete hackathons" on public.hackathons;
create policy "Portfolio admin can delete hackathons"
  on public.hackathons for delete to authenticated
  using ((select auth.jwt() ->> 'email') = 'admin@example.com');

alter table public.projects enable row level security;

drop policy if exists "Anyone can read portfolio projects" on public.projects;
create policy "Anyone can read portfolio projects"
  on public.projects for select using (true);

drop policy if exists "Portfolio admin can insert projects" on public.projects;
create policy "Portfolio admin can insert projects"
  on public.projects for insert to authenticated
  with check ((select auth.jwt() ->> 'email') = 'admin@example.com');

drop policy if exists "Portfolio admin can update projects" on public.projects;
create policy "Portfolio admin can update projects"
  on public.projects for update to authenticated
  using ((select auth.jwt() ->> 'email') = 'admin@example.com')
  with check ((select auth.jwt() ->> 'email') = 'admin@example.com');

drop policy if exists "Portfolio admin can delete projects" on public.projects;
create policy "Portfolio admin can delete projects"
  on public.projects for delete to authenticated
  using ((select auth.jwt() ->> 'email') = 'admin@example.com');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-images', 'project-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update set public = true;

drop policy if exists "Public can read project images" on storage.objects;
create policy "Public can read project images"
  on storage.objects for select using (bucket_id = 'project-images');

drop policy if exists "Portfolio admin can upload project images" on storage.objects;
create policy "Portfolio admin can upload project images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'project-images'
    and (select auth.jwt() ->> 'email') = 'admin@example.com'
  );

drop policy if exists "Portfolio admin can update project images" on storage.objects;
create policy "Portfolio admin can update project images"
  on storage.objects for update to authenticated
  using (bucket_id = 'project-images' and (select auth.jwt() ->> 'email') = 'admin@example.com')
  with check (bucket_id = 'project-images' and (select auth.jwt() ->> 'email') = 'admin@example.com');

drop policy if exists "Portfolio admin can delete project images" on storage.objects;
create policy "Portfolio admin can delete project images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'project-images' and (select auth.jwt() ->> 'email') = 'admin@example.com');
