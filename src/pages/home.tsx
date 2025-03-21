import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Tetris Game</h1>
        <div className="max-w-md mx-auto space-y-4">
          <Link 
            to="/play"
            className="block w-full py-3 px-4 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Play Game
          </Link>
          <Link 
            to="/debug"
            className="block w-full py-3 px-4 text-center bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Debug View
          </Link>
        </div>
      </div>
    </div>
  );
} 