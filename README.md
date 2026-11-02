# EcoVision — Vercel deployment

The minimal green EcoVision interface, packaged for standard Next.js on Vercel. The current Sites deployment is unchanged.

## Run locally

Requires Node.js 22 or 24. Run `npm ci`, copy `.env.example` to `.env.local`, set `GROQ_API_KEY`, then run `npm run dev`. Never use a NEXT_PUBLIC_ prefix for the provider key.

## Deploy

Import this folder as a Next.js project in your Vercel team. The build command is `npm run build`; install command is `npm ci`; output directory is the Next.js default. Set server environment variables for production and preview: `GROQ_API_KEY` (sensitive), `GROQ_MODEL=qwen/qwen3.8-27b`, `GROQ_REPORT_MODE=compact`. No key is included in this source. With an authenticated Vercel CLI, run `vercel --prod --scope adithya-bandela-eco-vision-gen-ai`.

The app has no login or paywall. Set deployment protection appropriately if you want public access. The Groq quota is shared across visitors.

## What changed for Vercel

The API uses Node.js environment variables instead of cloudflare:workers. The 120-second function budget allows the existing JSON retry. Compressed image JSON stays under 4 MB, below the Vercel function payload limit. UI, detector model, JSON validation and material guidance are preserved.

## Verify

`npm test`, `npm run typecheck`, `npm run build`. After deployment, open the public URL, upload a JPG/PNG/WEBP, analyze and confirm a report. Missing credentials return a controlled 503. Account quota can return 429. Some complex scenes require a closer photo.

Photos are processed by Groq and not saved by EcoVision. Only text reports stay locally. AI can make mistakes; check local recycling rules.
