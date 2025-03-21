import './styles/globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenuPage from '@pages/MainMenuPage';
import GamePage from '@pages/GamePage';
import DebugPage from '@pages/DebugPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenuPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/debug" element={<DebugPage />} />
      </Routes>
    </Router>
  );
}

export default App
