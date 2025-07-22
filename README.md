# Herdsman

## Description

**Herdsman** is a simple 2D mini-game prototype built with TypeScript and PixiJS. The goal of the game is to collect animals using the Main Hero and escort them to the destination point (the yard). The project demonstrates object-oriented programming, architectural best practices, and a modular, extendable game codebase.

---

## Tech Stack

- **Language:** TypeScript
- **Engine/Renderer:** PixiJS (v8+)

---

## Game Framework & Flow

- All game objects are rendered using PixiJS `Container` and `Graphics`.
- The main update loop handles hero and animal updates, interactions, and scoring.
- User input is processed via pointer events for click/tap movement.
- Scoreboard and timer UI are modular and easy to extend.
---

## Run Locally

1. `npm install`
2. `npm run dev`  
   _(or your project’s start script — see package.json)_
3. Open `http://localhost:5173` in your browser.


## Assets

- Placeholder graphics are used (PixiJS `Graphics`).  

## Author

By Kuznietsov Alex, 2025.
