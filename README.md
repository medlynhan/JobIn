# JobIn

JobIn is the job-seeker web app in the JobIn ecosystem, built with Next.js and TypeScript. It helps users discover and apply for nearby jobs, join skill-building classes, and includes a voicebot that assists blind and low‑vision users with navigating and using the site.

## Overview

With JobIn you can:
- Browse and apply to available jobs around you
- Enroll in provided skill classes to improve your qualifications
- Use a built-in voicebot to navigate and complete tasks more easily (accessibility‑focused)

## Tech Stack

- Next.js + React — App framework, routing, SSR/SSG, UI
- TypeScript — Type‑safe application code
- Firebase — App platform (Auth, database/storage as configured)
- Firebase Auth — Authentication for users
- Cloudinary — Media management and image delivery
- Vercel — Hosting and CI/CD for the Next.js app
- CSS — Styling

## Getting Started

### Prerequisites
- Next.js 18+ (LTS recommended)
- A package manager: npm (bundled with Next), pnpm, or Yarn
- A Firebase project (for Auth and other services you use)
- A Cloudinary account (for media)

### Installation

```sh
# Clone the repository
git clone https://github.com/medlynhan/JobIn.git
cd JobIn

# Install dependencies (pick one)
npm install
# or
pnpm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the project root and add your values. Common examples:

```bash
# Firebase (client-side keys must be NEXT_PUBLIC_ to be exposed to the browser)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_api_secret
```

Notes:
- In Next.js, variables available to the browser must be prefixed with `NEXT_PUBLIC_`.
- Do not expose server-only secrets (like `CLOUDINARY_API_SECRET`) to the client.

### Run in Development

```sh
npm run dev
```

- App runs at http://localhost:3000
- You may be prompted by the browser to allow microphone access (voicebot) and location access (nearby jobs).

### Build and Run in Production

```sh
# Create an optimized production build
npm run build

# Start the production server
npm start
```

Ensure all required environment variables are set on your host before starting.

## Accessibility

- Voicebot: The app includes a voice assistant designed to help blind and low‑vision users navigate and perform key actions.
  - Requires microphone permission in the browser.
  - Look for an on‑screen toggle or settings entry to enable it.

## Deployment (Vercel)

1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com/), click “New Project” and import the repository.
3. Framework preset: Next.js (auto-detected).
4. Add the same environment variables from `.env.local` to the Vercel project settings.
5. Deploy. Vercel will build and host the app, and automatically redeploy on new commits.
