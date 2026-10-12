# 🃏 Flip Game

A memory-matching card game built with **React 19, TypeScript, and React Router 7** — three difficulty levels, a countdown timer, and a move counter, with the game logic fully extracted into testable custom hooks.

## Gameplay

Choose a level, flip the cards, and find all matching pairs before the timer runs out. Fewer moves = better score.

| Level | Grid | Moves | Time |
|---------|------|-------|------|
| Easy | 4×4 | 40 | 120s |
| Medium | 6×6 | 40 | 120s |
| Hard | 8×8 | 60 | 120s |

## Architecture

Game state lives in composable custom hooks, keeping components purely presentational:

```
components/FlipGame/
├── index.tsx               # composition + layout
├── FlipCard.tsx            # single card (flip / match animations)
├── StatusBar.tsx           # timer + move counter
└── GameResult.tsx          # win / lose screen

hooks/
├── useFlipGame.tsx         # game state machine (preview, lock, match, restart)
├── useCardInteractions.tsx # card click rules
├── useCountdownTimer.tsx   # timer logic
└── __tests__/              # unit tests for the hook logic
```

## Tech Stack

- **React 19** + **React Router 7** (framework mode)
- **TypeScript** — typed game config, cards, and level system
- **Tailwind CSS 4** — responsive layout for mobile & desktop
- **Vitest** + **Testing Library** — unit tests for hook logic
- **Docker** — production image included (`Dockerfile`)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm test           # run unit tests
npm run build      # production build
npm start          # serve the production build
```

Docker:

```bash
docker build -t flip-game .
docker run -p 3000:3000 flip-game
```
