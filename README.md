# WayneHacks CMS

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
- Administrator CMS dashboard for [admins](https://waynehacks.com/admin)
- \***\*Costs 0 freakin dollars to run\*\***

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

---

🔽 Boilerplate stuff below 🔽

## Supabase Starter

This starter configures Supabase Auth to use cookies, making the user's session available throughout the entire Next.js app - Client Components, Server Components, Route Handlers, Server Actions and Middleware.

## Deploy your own

The Vercel deployment will guide you through creating a Supabase account and project. After installation of the Supabase integration, all relevant environment variables will be set up so that the project is usable immediately after deployment 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/thatziv/waynehacks&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv)

## Create from boilderplate

1. Create a [new Supabase project](https://database.new)
1. Run `npx create-next-app -e with-supabase` to create a Next.js app using the Supabase Starter template
1. Use `cd` to change into the app's directory
1. Run `npm install` to install dependencies
1. Rename `.env.local.example` to `.env.local` and update the values for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)
1. Run `npm run dev` to start the local development server

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

### Create a Supabase client

Check out the [`/app/_examples`](./app/_examples/) folder for an example of creating a Supabase client in:

- [Client Components](./app/_examples/client-component/page.tsx)
- [Server Components](./app/_examples/server-component/page.tsx)
- [Route Handlers](./app/_examples/route-handler/route.ts)
- [Server Actions](./app/_examples/server-action/page.tsx)

### Create `todo` table and seed with data (optional)

Navigate to [your project's SQL Editor](https://app.supabase.com/project/_/sql), click `New query`, paste the contents of the [init.sql](./supabase/migrations/20230618024722_init.sql) file and click `RUN`.

This will create a basic `todos` table, enable Row Level Security (RLS), and write RLS policies enabling `select` and `insert` actions for `authenticated` users.

To seed your `todos` table with some dummy data, run the contents of the [seed.sql](./supabase/seed.sql) file.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Next.js Auth Helpers Docs](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
