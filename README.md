Portfolio website made with React.

## Supabase portfolio admin

The admin page is available at `/admin`. Project edits are stored in Supabase; public visitors can read projects, while database and image changes are restricted by Row Level Security to the admin email you configure.

### One-time Supabase setup

1. Create a Supabase project and choose a strong database password.
2. In **Authentication → Users**, add your own user with your email and a strong password. Keep public signups disabled in **Authentication → Providers → Email**.
3. Open **SQL Editor**, paste `supabase/setup.sql`, replace each `admin@example.com` with that exact email, and run the script.
4. In **Project Settings → API Keys**, copy the Project URL and publishable key (the legacy `anon` key also works). Never put a `service_role` or secret key in this frontend.
5. Copy `.env.example` to `.env.local`, then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to those values. Restart `npm run dev`.
6. Visit `/admin/login` and sign in. Choose **Import current portfolio projects** once to copy the existing project list into Supabase. You can then add, edit, delete, reorder projects, and upload project images there.
7. Add those same two environment variables to your Vercel project under **Settings → Environment Variables**, for Preview and Production, then redeploy.

The public portfolio reads projects from Supabase after it is configured. The current source project list remains the fallback until the first import. Image uploads use a public read bucket so the portfolio can display them; only the configured admin email can upload, replace, or delete files.

This admin currently manages the Projects section. Other portfolio sections (profile, skills, education, contact details, and social links) are still maintained in the source files; they are not editable from the dashboard yet.
