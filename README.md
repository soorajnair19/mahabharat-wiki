# Mahabharat Card Explorer

An interactive, mythology-themed card explorer for Mahabharat characters and weapons. Built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Character cards** — Explore the five Pandavas (Arjuna, Bhima, Yudhishthira, Nakula, Sahadeva)
- **Weapon cards** — Discover Astras and Shastras (Gandiva, Brahmastra, Pashupatastra, Gada)
- **Filtering** — Filter by rarity, archetype (characters), and weapon type (weapons)
- **Detail modals** — Tap a card to view full details
- **Animations** — Framer Motion hover effects (scale, tilt) and card stagger
- **Mythology theme** — Gold accents, dark backgrounds, rarity-based glow

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Radix UI (Dialog)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to GitHub (or connect your preferred Git provider).

2. Go to [vercel.com](https://vercel.com) and sign in.

3. Click **Add New Project** and import this repository.

4. Vercel will auto-detect Next.js. Use the default settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (or leave empty)
   - **Output Directory:** `.next` (default)

5. Click **Deploy**. Your app will be live in a few minutes.

### One-line deploy

```bash
npx vercel
```

Follow the prompts to link or create a project. Vercel will build and deploy automatically on each push.

## Project Structure

```
/app
  layout.tsx, page.tsx
  /characters   — Character cards
  /weapons      — Weapon cards

/components
  Card.tsx, CharacterCard.tsx, WeaponCard.tsx
  CardGrid.tsx, Modal.tsx, Filters.tsx

/data
  /characters   — JSON files (arjuna, bhima, etc.)
  /weapons      — JSON files (gandiva, brahmastra, etc.)

/lib
  types.ts, data.ts, linking.ts, utils.ts
```
