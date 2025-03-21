import { useCallback, useEffect, useState } from 'react';
import { TetriminoState, TetriminoType } from '../../lib/tetris/types';
import { createTetrimino, moveTetrimino, getRandomTetriminoType } from '../../lib/tetris/factory';
import { getNextRotation } from '../../lib/tetris/rotation';
import { PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH, canMove, canRotate } from '../../lib/tetris/validation';
import { TetrisGame } from '../game/tetris-game';

export function GameView() {
  const [playfield, setPlayfield] = useState<number[][]>(
    Array(PLAYFIELD_HEIGHT).fill(null).map(() => Array(PLAYFIELD_WIDTH).fill(0))
  );
  const [activePiece, setActivePiece] = useState<TetriminoState | null>(null);
  const [score, setScore] = useState(0);
  const [nextPiece, setNextPiece] = useState<TetriminoType | null>(null);

  // Generate next piece
  const generateNextPiece = useCallback(() => {
    return getRandomTetriminoType();
  }, []);

  // Spawn a piece
  const spawnPiece = useCallback(() => {
    if (!nextPiece) {
      const newPiece = generateNextPiece();
      setActivePiece(createTetrimino(newPiece));
      setNextPiece(generateNextPiece());
    } else {
      setActivePiece(createTetrimino(nextPiece));
      setNextPiece(generateNextPiece());
    }
  }, [nextPiece, generateNextPiece]);

  // Auto-spawn piece
  useEffect(() => {
    if (!activePiece) {
      spawnPiece();
    }
  }, [activePiece, spawnPiece]);

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
            setScore(prev => prev + 1); // Score for soft drop
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
                  newPlayfield[fieldY][fieldX] = activePiece.type as unknown as number + 1;
                }
              }
            }
          }
          setPlayfield(newPlayfield);
          setActivePiece(null);

          // Check for completed lines
          let completedLines = 0;
          const updatedPlayfield = newPlayfield.filter(row => {
            if (row.every(cell => cell !== 0)) {
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
  }, [activePiece, playfield]);

  // Simply return the TetrisGame component which already has the layout we want
  return <TetrisGame />;
} 