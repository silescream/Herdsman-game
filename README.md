# Herdsman

## Description

**Herdsman** is a simple 2D mini-game prototype built with TypeScript and PixiJS. The goal of the game is to collect animals using the Main Hero and escort them to the destination point (the yard). The project demonstrates object-oriented programming, architectural best practices, and a modular, extendable game codebase.

---

## Features & Acceptance Criteria

- The player sees a green game field with the Main Hero (red circle).
- Animals (white circles) appear at random positions on the field in a random amount.
- The destination point (yard) is displayed as a yellow area.
- A score counter is displayed in the top UI.
- By clicking the field, the Main Hero moves to the clicked position.
- If the Main Hero gets close to an animal, the animal joins the group and follows the hero (up to 5 animals).
- If an animal reaches the yard, the score increases.

**Optional Features:**
- Animals can spawn at random intervals and positions (spawn generator).
- Animals can patrol or move randomly until collected.

---

## Tech Stack

- **Language:** TypeScript
- **Engine/Renderer:** PixiJS (v8+)
- **No frameworks:** No React/Vue/Angular used — pure PixiJS architecture.

---

## Architecture & Best Practices

- **OOP & SOLID:**  
  Each entity (Hero, Animal, Yard, Scoreboard) is implemented as a class with a single responsibility.  
  Logic is separated between entities and scene/game controllers for maintainability and testability.
- **Patterns:**  
  Used basic patterns such as Controller, Scene management, and EventBus for scalable game logic.
- **Code Style:**  
  Project is fully typed with TypeScript, follows modular file structure, and includes clear class separation and naming conventions.
- **Extensibility:**  
  The game is designed to be easily extendable:  
  new animals, UI, or behaviors can be added with minimal changes to the main logic.

---

## Game Framework & Flow

- All game objects are rendered using PixiJS `Container` and `Graphics`.
- The main update loop handles hero and animal updates, interactions, and scoring.
- User input is processed via pointer events for click/tap movement.
- Scoreboard and timer UI are modular and easy to extend.
- (Optional) Spine animation models or extra assets can be plugged in for visual polish.

---

## Run Locally

1. `npm install`
2. `npm start`  
   _(or your project’s start script — see package.json)_
3. Open `http://localhost:YOUR_PORT` in your browser.

---

## OOP / SOLID / Patterns Knowledge (short self-reflection)

- **OOP:** The game is built around clear class-based entities with encapsulated state and behavior.
- **SOLID:**  
  - Single Responsibility: Each class (Hero, Animal, Yard, Scoreboard) has only one responsibility.  
  - Open/Closed: Entities and controllers can be extended without modifying existing code.
  - Dependency Inversion: Scene controllers interact with entities via public interfaces.
- **Patterns:**  
  - Controller pattern for managing game logic.
  - EventBus (where relevant) for decoupled communication between systems.
- **Architecture:**  
  - Clean, modular file structure for maintainability and scalability.
  - No “god objects”: logic is separated by domain (entities, controllers, UI).

---

## Assets

- Placeholder graphics are used (PixiJS `Graphics`).  
  You may add Spine models or your own art to improve the visuals.

---

## Author

By Kuznietsov Alex, 2025.

