import React, { useEffect } from 'react';
import { usePageTitle } from '@contexts/PageTitleContext';

const DebugPage: React.FC = () => {
    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle('Debug Mode');
    }, [setTitle]);

    return (
        <>
            <h2 className="text-3xl mb-4">Debug Page</h2>
            {/* Placeholder for the grid and debug controls */}
            <div className="w-full max-w-md bg-white p-4 rounded shadow mb-4">
                <p className="text-center text-gray-700">Debug Controls Placeholder</p>
            </div>
        </>
    )
}

export default DebugPage;