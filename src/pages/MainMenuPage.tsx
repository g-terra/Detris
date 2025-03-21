import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '@contexts/PageTitleContext';

const MainMenuPage: React.FC = () => {
    const navigate = useNavigate();
    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle('Detris');
    }, [setTitle]);

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl mb-8">Welcome to Detris</h2>
            <button
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                onClick={() => navigate('/game')}
            >
                Start Game
            </button>
            <button
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                onClick={() => navigate('/debug')}
            >
                Debug Mode
            </button>
        </div>
    );
}

export default MainMenuPage;