# Tetris Game Project Tickets Breakdown

## Ticket 1: Project Initialization & Setup

- **Description:**
  Set up the initial React frontend and Java backend project structure.

- **Requirements:**
  - Initialize React using Vite or Create React App.
  - Setup backend project structure using Java and Spring Boot (or similar).
  - Setup GitHub repository with `.gitignore`.
  - Initial README.md with project instructions.

- **Branch Creation:**

  `git checkout -b feature/project-setup`

---

## Ticket 2: Implement Basic Game UI (Retro Gameboy style)

- **Description:**
  Create a basic Tetris UI layout with a retro Gameboy aesthetic.

- **Requirements:**
  - Create main game area (playfield grid).
  - Basic layout for score, next piece, and controls placeholder.
  - Apply CSS styling to mimic a retro Gameboy feel (pixelated fonts, backgrounds, etc.).

- **Branch Creation:**

  `git checkout -b feature/ui-retro-gameboy`

---

## Ticket 3: Create Tetrimino Piece Logic

- **Description:**
  Implement the logic for spawning, moving, and rotating Tetris pieces.

- **Requirements:**
  - Implement all 7 official Tetris pieces.
  - Ensure correct rotation mechanics according to official guidelines.
  - Validate piece placement within playfield bounds.

- **Branch Creation:**

  `git checkout -b feature/tetrimino-logic`

---

## Ticket 4: Single Player Gameplay Mechanics

- **Description:**
  Implement basic single-player mechanics.

- **Requirements:**
  - Implement piece falling and soft/hard drop.
  - Line clearing logic.
  - Scoring system following official Tetris guidelines.

- **Branch Creation:**

  `git checkout -b feature/single-player-mechanics`

---

## Ticket 5: Player Input and Controls

- **Description:**
  Integrate player input for game controls.

- **Requirements:**
  - Keyboard controls (left/right, rotate, soft drop, hard drop).
  - Responsive and intuitive control handling in React.

- **Branch Creation:**

  `git checkout -b feature/player-controls`

---

## Ticket 6: Game Over Conditions & Basic UI Integration

- **Description:**
  Implement proper game-over logic and display results.

- **Requirements:**
  - Detect when the playfield reaches the top (game over state).
  - Display "Game Over" screen and score summary.
  - For multiplayer, indicate which player won.

- **Branch Creation:**

  `git checkout -b feature/game-over-logic`

---

## Ticket 7: Implement Basic Multiplayer Backend (Java)

- **Description:**
  Establish initial multiplayer backend infrastructure.

- **Requirements:**
  - Java backend server setup with WebSockets (Spring WebSocket).
  - Player connection management.
  - Setup for real-time communication channels.

- **Branch Creation:**

  `git checkout -b feature/multiplayer-backend-setup`

---

## Ticket 8: Multiplayer Room Creation and Unique Link Generation

- **Description:**
  Allow players to create a multiplayer room with unique, shareable URLs.

- **Requirements:**
  - Generate unique identifiers for game rooms.
  - Implement simple joining via unique URL.
  - Frontend integration to start or join multiplayer games.

- **Branch Creation:**

  `git checkout -b feature/multiplayer-room-links`

---

## Ticket 9: Multiplayer Game State Synchronization

- **Description:**
  Implement real-time synchronization of Tetris gameplay state between two players.

- **Requirements:**
  - Send and receive piece states, positions, rotations, and cleared lines via WebSockets.
  - Minimize lag and ensure smooth synchronization.
  - Handle basic conflict resolution to keep game states consistent.

- **Branch Creation:**

  `git checkout -b feature/multiplayer-sync`

---

## Ticket 10: Multiplayer Garbage Line Mechanics

- **Description:**
  Implement competitive multiplayer garbage lines according to official Tetris rules.

- **Requirements:**
  - Send garbage lines to opponent when lines are cleared.
  - Adjust gameplay to integrate received garbage lines appropriately.

- **Branch Creation:**

  `git checkout -b feature/garbage-line-mechanics`

---

## Ticket 11: Deployment Setup

- **Description:**
  Prepare the application for deployment to a free hosting service.

- **Requirements:**
  - Configure frontend for deployment (e.g., GitHub Pages, Netlify, Vercel).
  - Deploy Java backend (e.g., Railway, Render, or Heroku's free tier).
  - Document deployment procedures clearly in README.md.

- **Branch Creation:**

  `git checkout -b feature/deployment-setup`

---

## Ticket 12 (Future): Multiplayer Game History between Players

- **Description:**
  Record and display historical results between two players.

- **Requirements (Post-MVP):**
  - Backend logic to save match results.
  - Database integration (free tier, e.g., PostgreSQL on Railway).
  - Frontend UI to show historical matchups between players.

- **Branch Creation (Future work):**

  `git checkout -b feature/multiplayer-game-history`

