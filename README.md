# WayneHacks Management Platform

<img width=200 height=200 src="https://www.waynehacks.com/favicon.png"/>

This is the waynehacks.com website repo.

## Features

The site features:

- Login/sign account up
- Support up to 10,000 MAU
- User administration settings
- Application submissions dashboard
- Dynamic configuration of site settings on Supabase (check the `kv` table)
- Discord webhook integration
  - User sign up
  - Application submission
  - Application status updates
- Administrator dashboard for [admins](https://waynehacks.com/admin)
- Administrator Live [(realtime)](https://supabase.com/docs/guides/realtime) application dashboard for [admins](https://waynehacks.com/admin/applications)
- **Costs 0 freakin dollars to run**

## Technicalities

The website is built w/ [Next.js](https://nextjs.org) v14. For styling, we're using tailwindcss and for the backend, we're using [Supabase](https://supabase.com) BaaS (firebase alternative). The next configuration we're running is serverless since Vercel - the place where this app is deployed - automatically handles it for us. With that, we almost fully have a SSR application with custom-protected middleware routing. The user will never directly interact with our supabase instance - it all goes through our server first.

### Database (public) [Schema](/supabase/migrations/20231122005059_remote_commit.sql)

![public-schema](/.github/img/public-schema.png)

### Architecture Diagram

![diagram](/.github/img/diagram.png)

## Setup

> [!NOTE]
> To start developing, you will need to install [Node.js](https://nodejs.org)

1. Clone the repo

```sh
git clone https://github.com/thatziv/waynehacks
cd waynehacks
```

2. Install dependencies

```sh
npm i
```

3. Create a `.env.local` file in the project's root. Reach out to @ThatZiv for the contents of this file.

4. Run in dev mode

```sh
npm run dev
```

## Branding

### Colors

- ![#FACC15](https://via.placeholder.com/15/FACC15/000000?text=+) `#FACC15` - Gold
- ![#14532d](https://via.placeholder.com/15/14532d/000000?text=+) `#14532d` - Dark Green
- ![#000000](https://via.placeholder.com/15/000000/000000?text=+) `#000000` - Black
- ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) `#FFFFFF` - White

### Fonts

- [Blinker](https://fonts.google.com/specimen/Blinker) - Primary Font
- [Open Sans](https://fonts.google.com/specimen/Open+Sans) - Body Font

### Graphics

- ![WayneHacks Logo](public/whacks2-trans.png)
  Primary Transparent Logo (PNG)
- ![WayneHacks Logo](public/android-chrome-512x512.png) Logo with background
- ![Banner](https://i.imgur.com/l4TRXB4.png) Banner with background

---
