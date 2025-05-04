import React from 'react';
import { useNavigate } from 'react-router-dom';

const MirrorGameIntro: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/games/mirror-game/questions');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-gray-400 mb-2">Welcome to the mirror of the future</div>
        
        <div className="mb-8">
          <img 
            src="/images/mirror-icon.png" 
            alt="Mirror of the Future" 
            className="w-32 h-32 mx-auto"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"%3E%3Cpath fill="%23FFD700" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"%3E%3C/path%3E%3Cpath fill="%23FFD700" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"%3E%3C/path%3E%3C/svg%3E';
            }}
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">MIRROR OF THE FUTURE</h1>
        
        <p className="text-lg text-gray-600 italic mb-8">
          "Peek into your future. Discover who you are — and what paths await you"
        </p>
        
        <button 
          onClick={handleContinue}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MirrorGameIntro;