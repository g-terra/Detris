import React from 'react';
import {useNavigate} from 'react-router-dom';

const MainMenuPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <h1 className="text-4xl text-center">Detris</h1>
        <button
          className="px-6 py-2 border-2 border-gray-800 rounded hover:bg-gray-800 hover:text-white transition"
          onClick={() => navigate('/game')}
        >
          Start Game
        </button>
        <button
          className="px-6 py-2 border-2 border-gray-800 rounded hover:bg-gray-800 hover:text-white transition"
          onClick={() => navigate('/debug')}
        >
          Debug
        </button>
      </div>
    )
}

export default MainMenuPage;