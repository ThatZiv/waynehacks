# WayneHacks Management Platform

<img width=200 height=200 src="https://www.waynehacks.com/icon.png"/>

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

## Setup (Backend)

1. Follow the instructions for [self-hosting](https://supabase.com/docs/guides/self-hosting/docker) Supabase to setup the local dev environment.

2. Follow the migration [guide](https://supabase.com/docs/guides/cli/local-development).

3. Create a `.env` file in the project's root. Reach out to @ThatZiv for the contents of this file.

4. Run the following command to start the backend server:

```sh
npx supabase start
```

## Branding

<details>
<summary>WayneHacks 2</summary>

### Colors

- ![#FACC15](https://placehold.co/15x15/FACC15/FACC15.png) `#FACC15` - Gold
- ![#14532d](https://placehold.co/15x15/14532d/14532d.png) `#14532d` - Dark Green
- ![#000000](https://placehold.co/15x15/000000/000000.png) `#000000` - Black
- ![#FFFFFF](https://placehold.co/15x15/FFFFFF/FFFFFF.png) `#FFFFFF` - White

### Fonts

- [Blinker](https://fonts.google.com/specimen/Blinker) - Primary Font
- [Open Sans](https://fonts.google.com/specimen/Open+Sans) - Body Font

### Graphics

- ![WayneHacks Logo](public/whacks2-trans.png)
  Primary Transparent Logo (PNG)
- ![WayneHacks Logo](public/android-chrome-512x512.png) Logo with background
- ![Banner](https://i.imgur.com/l4TRXB4.png) Banner with background

</details>

<details>
<summary>WayneHacks 3</summary>

### Colors

- ![#df0046](https://placehold.co/15x15/df0046/df0046.png) `#df0046` - Rose
- ![#e5888c](https://placehold.co/15x15/e5888c/e5888c.png) `#e5888c` - Light[er] rose (accent)
- ![#edf4ed](https://placehold.co/15x15/edf4ed/edf4ed.png) `#edf4ed` - Light[er] green
- ![#353535](https://placehold.co/15x15/353535/353535.png) `#353535` - Gray
- ![#FFFFFF](https://placehold.co/15x15/FFFFFF/FFFFFF.png) `#FFFFFF` - White

### Fonts

- [Stratum](https://fonts.adobe.com/fonts/stratum) - Primary Font
- [Blinker](https://fonts.google.com/specimen/Blinker) - Secondary Font

## Graphics

- ![WayneHacks Logo](public/icon.png)
  Primary Transparent Logo (PNG)
- ![Banner](https://i.imgur.com/raO795F.png) Banner with background
- ![Banner-transparent](https://i.imgur.com/ya6yuCM.png) Transparent banner

</details>

<details>
<summary>WayneHacks 4</summary>

### Colors

- ![#FAFAFA](https://placehold.co/15x15/FAFAFA/FAFAFA.png) `#FAFAFA` - Off White
- ![#0EA5E9](https://placehold.co/15x15/0EA5E9/0EA5E9.png) `#0EA5E9` - Light Blue - Primary Accent
- ![#041A25](https://placehold.co/15x15/041A25/041A25.png) `#041A25` - Dark Blue - background gradient 1
- ![#14091B](https://placehold.co/15x15/14091B/14091B.png) `#14091B` - Dark Purple - background gradient 2

### Fonts

- [Stratum](https://fonts.adobe.com/fonts/stratum) - Primary Font
- [Open Sans](https://fonts.google.com/specimen/Open+Sans) - Body Font
- [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) - Monospace / Code Font

### Graphics

- ![WayneHacks Logo](public/icon.png)
  Primary Transparent Logo (PNG)
- ![Banner](https://i.imgur.com/fldgBvz.png) Banner with background
- ![Banner-transparent](https://i.imgur.com/2uPsF8M.png) Banner transparent
- ![ImgurLogo](https://i.imgur.com/pAiyQPp.png) Imgur Logo (for hosting graphics)
-

</details>

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.

---
