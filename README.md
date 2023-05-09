# RepoRadar

Veed.io trial project

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Vercel-blue)](https://repo-radar-git-main-ui-d.vercel.app/)

## Features

-   Next.js for SSG React apps
-   Tailwind CSS for styling
-   DaisyUI for a beautiful and functional UI
-   TypeScript for type safety
-   Supabase for authentication and storage
-   GitHub API for fetching repositories
-   LocalStorage for storing user data

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/ui-d/RepoRadar.git
```

2. Install dependencies

    ```bash
    cd RepoRadar
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4. Run the development server

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app

## Deployment

The app is currently deployed on [Vercel](https://vercel.com/). Visit the live demo here: [https://repo-radar-git-main-ui-d.vercel.app](https://repo-radar-git-main-ui-d.vercel.app/)

## Optimization Recommendations

To fully optimize the app, consider the following changes:

1. Switch to a server-side rendering (SSR) for better authentication and data fetching experience
2. Use a database (i.e Supabase (PostgreSQL) with Prisma) to store user data and repositories
3. Use a state management library to manage app state

## License

[MIT](https://choosealicense.com/licenses/mit/)
