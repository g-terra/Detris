import { Link } from 'react-router-dom';
import { GameView } from '../components/tetris/game-view';

export function PlayPage() {
  return (
    <div className="min-h-screen bg-[#8b956d] flex flex-col">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-8">
          <Link 
            to="/"
            className="px-4 py-2 font-['Press_Start_2P'] text-[#0f380f] hover:text-[#306230] transition"
          >
            ← MENU
          </Link>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <GameView />
      </div>
    </div>
  );
} 