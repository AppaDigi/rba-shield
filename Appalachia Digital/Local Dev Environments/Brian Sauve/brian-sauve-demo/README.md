# Brian Sauvé — Demo Site

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbrentonriling%2Fbrian-sauve-demo&project-name=brian-sauve-demo&repository-name=brian-sauve-demo)

A 5-page demo Next.js 14 (App Router) site for Brian Sauvé exploring a "Dark literary editorial" aesthetic. 

## Stack

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Typography**: `@next/font` (Cormorant Garamond, Crimson Pro)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Running Locally

This project has zero environment variables. You can run it immediately after cloning:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

1. `/` — Home (Hero, Latest Album, Pillars, Patreon)
2. `/music` — Discography grid with typographic art cards
3. `/listen` — Featured podcasts (Bright Hearth & Haunted Cosmos)
4. `/words` — Books and recent essays
5. `/about` — Bio, contact info, and related projects

## Deployment

This site is optimized for Vercel. Push to your GitHub repository and import it to Vercel, or click the Deploy button above.
The included `vercel.json` provides strict security headers for production.
