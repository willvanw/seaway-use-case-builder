# Seaway Use Case Guide — Deployment Guide

## Architecture
- **Frontend**: Next.js 14 (App Router) on Vercel
- **Auth**: Supabase (Google SSO)
- **Styling**: Tailwind CSS + custom animations

---

## Step 1: Supabase Setup

### 1a. Create Project
1. Go to [supabase.com](https://supabase.com) → Dashboard → New Project
2. Name it `seaway-use-case-guide`
3. Copy your **Project URL** and **anon public key** from Settings → API

### 1b. Enable Google OAuth
1. In Supabase Dashboard → Authentication → Providers → Google
2. Toggle **Enable Google provider**
3. You need a Google OAuth client:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create or select a project
   - APIs & Services → Credentials → Create OAuth 2.0 Client ID
   - Application type: **Web application**
   - Authorized redirect URI: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
4. Paste the **Client ID** and **Client Secret** into the Supabase Google provider config
5. Save

### 1c. Configure Redirect URLs
1. In Supabase → Authentication → URL Configuration
2. Set **Site URL** to your Vercel deployment URL (e.g., `https://seaway-use-case-guide.vercel.app`)
3. Add to **Redirect URLs**:
   - `https://seaway-use-case-guide.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for dev)

---

## Step 2: Vercel Deployment

### 2a. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Seaway Use Case Guide"
git remote add origin https://github.com/YOUR_USERNAME/seaway-use-case-guide.git
git push -u origin main
```

### 2b. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Deploy

### 2c. Post-Deploy
1. Copy your Vercel deployment URL
2. Update Supabase **Site URL** to match
3. Update Supabase **Redirect URLs** to include `https://your-domain.vercel.app/auth/callback`

---

## Step 3: Custom Domain (Optional)
1. In Vercel → Project Settings → Domains
2. Add your custom domain
3. Update Supabase redirect URLs accordingly

---

## Local Development
```bash
# Clone and install
git clone <repo-url>
cd seaway-use-case-guide
npm install

# Create .env.local
cp .env.local.example .env.local
# Fill in your Supabase credentials

# Run dev server
npm run dev
```

Visit http://localhost:3000

---

## File Structure
```
src/
├── app/
│   ├── globals.css          # Global styles + animations
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── login/page.tsx       # Google SSO login
│   ├── assess/page.tsx      # 10-question Q&A
│   ├── results/page.tsx     # 5 recommendations
│   └── auth/callback/       # OAuth callback
├── data/
│   ├── useCases.ts          # 30 enterprise AI use cases
│   └── questions.ts         # 10 assessment questions
├── lib/
│   ├── scoringEngine.ts     # Recommendation algorithm
│   └── supabase/            # Supabase client configs
└── middleware.ts             # Auth route protection
```
