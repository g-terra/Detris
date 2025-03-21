import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/globals.css'
import { TetrisGame } from "./components/game/tetris-game"
import DebugPage from './pages/debug';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TetrisGame />} />
        <Route path="/debug" element={<DebugPage />} />
      </Routes>
    </BrowserRouter>
  )
}
