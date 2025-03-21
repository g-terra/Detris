import { useState } from "react";
import { Link } from "react-router-dom";
import { GAME_COLORS } from "@/lib/constants/colors";
import { GameGrid } from "@/components/game/game-grid";
import { NextPiece } from "@/components/game/next-piece";
import { createTetrimino, getRandomTetriminoType } from "@/lib/tetris/factory";
import { calculateHardDrop, checkCollision } from "@/lib/tetris/collision";
import { rotateTetrimino } from "@/lib/tetris/rotation";
import { Position, Rotation, TetriminoType } from "@/lib/tetris/types";

export default function DebugPage() {
  const [currentPiece, setCurrentPiece] = useState(createTetrimino('T'));
  const [nextPiece, setNextPiece] = useState(createTetrimino(getRandomTetriminoType()));
  const [rotation, setRotation] = useState<Rotation>(0);
  const [position, setPosition] = useState<Position>({ x: 3, y: 0 });
  const [board, setBoard] = useState<(0 | 1)[][]>(
    Array(20).fill(0).map(() => Array(10).fill(0))
  );

  // Create an empty board for collision testing
  const handleRotate = () => {
    const newRotation = ((rotation + 90) % 360) as Rotation;
    setRotation(newRotation);
  };

  const handleMove = (dx: number, dy: number) => {
    const newPosition = { x: position.x + dx, y: position.y + dy };
    if (!checkCollision(board, { ...currentPiece, position: newPosition })) {
      setPosition(newPosition);
    }
  };

  const handleHardDrop = () => {
    const dropPosition = calculateHardDrop(board, { ...currentPiece, position, rotation });
    
    // Update board with the placed piece
    const newBoard = [...board.map(row => [...row])];
    const rotatedShape = rotateTetrimino(currentPiece.shape, rotation);
    
    // Add piece to board using the rotated shape
    for (let y = 0; y < rotatedShape.length; y++) {
      for (let x = 0; x < rotatedShape[y].length; x++) {
        if (rotatedShape[y][x]) {
          const boardY = y + dropPosition.y;
          const boardX = x + dropPosition.x;
          if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
            newBoard[boardY][boardX] = 1;
          }
        }
      }
    }
    
    setBoard(newBoard);
    setCurrentPiece(nextPiece);
    setNextPiece(createTetrimino(getRandomTetriminoType()));
    setRotation(0);
    setPosition({ x: 3, y: 0 });
  };

  const handleNewPiece = () => {
    setCurrentPiece(nextPiece);
    setNextPiece(createTetrimino(getRandomTetriminoType()));
    setRotation(0);
    setPosition({ x: 3, y: 0 });
  };

  const handleResetBoard = () => {
    setBoard(Array(20).fill(0).map(() => Array(10).fill(0)));
  };

  return (
    <div 
      className="min-h-screen p-8"
      style={{ backgroundColor: GAME_COLORS.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="px-3 py-1 rounded text-sm"
            style={{ 
              backgroundColor: GAME_COLORS.text,
              color: GAME_COLORS.background
            }}
          >
            ← Back to Game
          </Link>
          <h1 
            className="text-4xl font-bold"
            style={{ color: GAME_COLORS.text }}
          >
            Tetris Debug Mode
          </h1>
        </div>

        <div className="flex gap-8">
          <div>
            <GameGrid 
              currentPiece={{
                ...currentPiece,
                position,
                rotation
              }}
              board={board}
            />
          </div>

          <div className="space-y-8">
            <NextPiece piece={nextPiece} />

            <div className="flex gap-4">
              <div 
                className="p-4 rounded-lg w-64"
                style={{ backgroundColor: GAME_COLORS.text }}
              >
                <h2 
                  className="text-xl font-bold mb-4"
                  style={{ color: GAME_COLORS.background }}
                >
                  Debug Controls
                </h2>
                
                <div className="space-y-4">
                  <button
                    onClick={handleNewPiece}
                    className="block w-full px-4 py-2 rounded"
                    style={{ backgroundColor: GAME_COLORS.secondary }}
                  >
                    New Random Piece
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleMove(-1, 0)}
                      className="px-4 py-2 rounded"
                      style={{ backgroundColor: GAME_COLORS.secondary }}
                    >
                      ←
                    </button>
                    <button
                      onClick={() => handleMove(0, 1)}
                      className="px-4 py-2 rounded"
                      style={{ backgroundColor: GAME_COLORS.secondary }}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleMove(1, 0)}
                      className="px-4 py-2 rounded"
                      style={{ backgroundColor: GAME_COLORS.secondary }}
                    >
                      →
                    </button>
                  </div>

                  <button
                    onClick={handleRotate}
                    className="block w-full px-4 py-2 rounded"
                    style={{ backgroundColor: GAME_COLORS.secondary }}
                  >
                    Rotate
                  </button>

                  <button
                    onClick={handleHardDrop}
                    className="block w-full px-4 py-2 rounded"
                    style={{ backgroundColor: GAME_COLORS.secondary }}
                  >
                    Hard Drop
                  </button>

                  <button
                    onClick={handleResetBoard}
                    className="block w-full px-4 py-2 rounded"
                    style={{ backgroundColor: GAME_COLORS.secondary }}
                  >
                    Reset Board
                  </button>
                </div>
              </div>

              <div 
                className="p-4 rounded-lg flex-1"
                style={{ backgroundColor: GAME_COLORS.text }}
              >
                <h2 
                  className="text-xl font-bold mb-4"
                  style={{ color: GAME_COLORS.background }}
                >
                  Current State
                </h2>
                <pre 
                  className="font-mono text-sm whitespace-pre-wrap"
                  style={{ color: GAME_COLORS.background }}
                >
                  {JSON.stringify(
                    {
                      currentPiece: {
                        type: currentPiece.type,
                        position,
                        rotation
                      },
                      nextPiece: {
                        type: nextPiece.type
                      }
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 