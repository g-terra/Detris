import React, { useEffect } from 'react';
import { usePageTitle } from '@contexts/PageTitleContext';

const GamePage: React.FC = () => {
    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle('Game');
    }, [setTitle]);

    return (
      <>
        {/* Placeholder for the Tetris grid, next shape preview, score panel, etc. */}
        <div className="w-full max-w-md bg-white p-4 rounded shadow">
          <p className="text-center text-gray-700">Game Grid Placeholder</p>
        </div>
      </>
    );
}

export default GamePage;