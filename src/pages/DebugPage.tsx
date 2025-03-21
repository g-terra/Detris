import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@components/layout/Layout';

const DebugPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
      {/* Return Button Positioned at the Top-Left */}
      <button
        className="absolute top-4 left-4 px-4 py-2 border-2 border-gray-800 rounded hover:bg-gray-800 hover:text-white transition"
        onClick={() => navigate('/')}
      >
        Back to Menu
      </button>
      <h2 className="text-3xl mb-4">Debug Page</h2>
      {/* Placeholder for the grid and debug controls */}
      <div className="w-full max-w-md bg-white p-4 rounded shadow mb-4">
        <p className="text-center text-gray-700">Debug Controls Placeholder</p>
      </div>
    </Layout>
    )
}

export default DebugPage;