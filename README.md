# Detris - Modern Tetris Game

A modern implementation of the classic Tetris game, featuring both single-player and multiplayer modes. Built with React, TypeScript, and modern web technologies.

## Features

- Classic Tetris gameplay with authentic mechanics
- Retro Game Boy aesthetic with modern touches
- Real-time multiplayer support (coming soon)
- Responsive design for various screen sizes

## Tech Stack

- React + TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Shadcn UI for components
- Framer Motion for animations
- Vitest + React Testing Library for testing

## Development

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/detris.git
   cd detris
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # Reusable UI components
│   ├── game/      # Game-specific components
│   └── layout/    # Layout components
├── lib/           # Utilities and helpers
├── styles/        # Global styles and themes
└── tests/         # Test setup and utilities
```

## License

MIT License - see LICENSE file for details
