import './styles/globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenuPage from '@pages/MainMenuPage';
import GamePage from '@pages/GamePage';
import DebugPage from '@pages/DebugPage';
import Layout from '@components/layout/Layout';
import { PageTitleProvider } from '@contexts/PageTitleContext';

function App() {
  return (
    <Router>
      <PageTitleProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<MainMenuPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/debug" element={<DebugPage />} />
          </Routes>
        </Layout>
      </PageTitleProvider>
    </Router>
  );
}

export default App
