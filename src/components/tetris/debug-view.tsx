import { useCallback, useEffect, useState } from 'react';
import { TetriminoState } from '../../lib/tetris/types';
import { createTetrimino, moveTetrimino, getRandomTetriminoType } from '../../lib/tetris/factory';
import { getNextRotation } from '../../lib/tetris/rotation';
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

  // Spawn a random piece
  const spawnPiece = useCallback(() => {
    const randomType = getRandomTetriminoType();
    setActivePiece(createTetrimino(randomType));
  }, []);

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
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePiece, playfield]);

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
    <div className="p-8">
      <div className="flex gap-8">
        <div className="border-2 border-gray-700 inline-block bg-gray-900">
          {renderGrid()}
        </div>
        <div className="space-y-4">
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
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-white font-bold mb-2">Current State</h3>
            <pre className="text-xs text-gray-300">
              {JSON.stringify(
                {
                  currentPiece: activePiece ? {
                    type: activePiece.type,
                    position: activePiece.position,
                    rotation: activePiece.rotation
                  } : null,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 