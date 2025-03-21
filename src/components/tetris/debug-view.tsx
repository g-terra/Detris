import { useCallback, useEffect, useState } from 'react';
import { TetriminoState, TetriminoType, TETRIMINO_COLORS } from '../../lib/tetris/types';
import { createTetrimino, getNextRotation, moveTetrimino } from '../../lib/tetris/tetriminos';
import { PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH, canMove, canRotate } from '../../lib/tetris/validation';

const CELL_SIZE = 30; // pixels

interface TetrisDebugViewProps {
  isDebugMode?: boolean;
}

export function TetrisDebugView({ isDebugMode = true }: TetrisDebugViewProps) {
  const [playfield, setPlayfield] = useState<number[][]>(
    Array(PLAYFIELD_HEIGHT).fill(null).map(() => Array(PLAYFIELD_WIDTH).fill(0))
  );
  const [activePiece, setActivePiece] = useState<TetriminoState | null>(null);
  const [score, setScore] = useState(0);

  // Spawn a random piece
  const spawnPiece = useCallback(() => {
    const types = Object.values(TetriminoType);
    const randomType = types[Math.floor(Math.random() * types.length)] as TetriminoType;
    setActivePiece(createTetrimino(randomType));
  }, []);

  // Auto-spawn piece in play mode
  useEffect(() => {
    if (!isDebugMode && !activePiece) {
      spawnPiece();
    }
  }, [isDebugMode, activePiece, spawnPiece]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePiece) return;

      switch (e.key) {
        case 'ArrowLeft':
          if (canMove(activePiece, { x: -1, y: 0 }, playfield)) {
            setActivePiece(moveTetrimino(activePiece, { x: -1, y: 0 }));
          }
          break;
        case 'ArrowRight':
          if (canMove(activePiece, { x: 1, y: 0 }, playfield)) {
            setActivePiece(moveTetrimino(activePiece, { x: 1, y: 0 }));
          }
          break;
        case 'ArrowDown':
          if (canMove(activePiece, { x: 0, y: 1 }, playfield)) {
            setActivePiece(moveTetrimino(activePiece, { x: 0, y: 1 }));
            if (!isDebugMode) {
              setScore(prev => prev + 1); // Score for soft drop
            }
          }
          break;
        case ' ': // Space bar
          const nextRotation = getNextRotation(activePiece);
          if (canRotate(activePiece, nextRotation.shape, playfield)) {
            setActivePiece(nextRotation);
          }
          break;
        case 'Enter':
          // Lock piece in place
          const newPlayfield = [...playfield.map(row => [...row])];
          for (let y = 0; y < activePiece.shape.length; y++) {
            for (let x = 0; x < activePiece.shape[y].length; x++) {
              if (activePiece.shape[y][x]) {
                const fieldY = activePiece.position.y + y;
                const fieldX = activePiece.position.x + x;
                if (fieldY >= 0 && fieldY < PLAYFIELD_HEIGHT && fieldX >= 0 && fieldX < PLAYFIELD_WIDTH) {
                  newPlayfield[fieldY][fieldX] = 1;
                }
              }
            }
          }
          setPlayfield(newPlayfield);
          setActivePiece(null);

          // Check for completed lines
          let completedLines = 0;
          const updatedPlayfield = newPlayfield.filter(row => {
            if (row.every(cell => cell === 1)) {
              completedLines++;
              return false;
            }
            return true;
          });

          // Add new empty lines at the top
          while (updatedPlayfield.length < PLAYFIELD_HEIGHT) {
            updatedPlayfield.unshift(Array(PLAYFIELD_WIDTH).fill(0));
          }

          if (completedLines > 0) {
            setPlayfield(updatedPlayfield);
            setScore(prev => prev + (completedLines * 100)); // Basic scoring
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePiece, playfield, isDebugMode]);

  // Render the grid
  const renderGrid = () => {
    const grid = [...playfield.map(row => [...row])];
    
    // Add active piece to the grid visualization
    if (activePiece) {
      activePiece.shape.forEach((row: number[], y: number) => {
        row.forEach((cell: number, x: number) => {
          if (cell) {
            const fieldY = activePiece.position.y + y;
            const fieldX = activePiece.position.x + x;
            if (fieldY >= 0 && fieldY < PLAYFIELD_HEIGHT && fieldX >= 0 && fieldX < PLAYFIELD_WIDTH) {
              grid[fieldY][fieldX] = 2; // Use 2 to distinguish active piece
            }
          }
        });
      });
    }

    return grid.map((row: number[], y: number) => (
      <div key={y} className="flex">
        {row.map((cell: number, x: number) => (
          <div
            key={`${x}-${y}`}
            className={`
              border border-gray-700
              ${cell === 0 ? 'bg-gray-900' : cell === 1 ? 'bg-blue-500' : 'bg-purple-500'}
            `}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className={isDebugMode ? 'p-8' : 'p-4'}>
      {isDebugMode && (
        <div className="mb-4">
          <button
            onClick={spawnPiece}
            disabled={!!activePiece}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Spawn Piece
          </button>
        </div>
      )}
      <div className="flex gap-8">
        <div className="border-2 border-gray-700 inline-block bg-gray-900">
          {renderGrid()}
        </div>
        <div className="space-y-4">
          <div className="text-2xl font-bold">Score: {score}</div>
          {isDebugMode && (
            <div className="space-y-2 text-sm">
              <p>Controls:</p>
              <ul className="list-disc list-inside">
                <li>Arrow keys: Move piece</li>
                <li>Space: Rotate piece</li>
                <li>Enter: Lock piece</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 