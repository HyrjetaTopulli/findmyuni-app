import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateUserQuizResults } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const MirrorGameEnd: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { interestsResults } = useSelector((state: RootState) => state.quiz);

  // Update user profile with mirror game results
  useEffect(() => {
    if (interestsResults) {
      // Store the mirror game results in the user's profile
      dispatch(updateUserQuizResults({ 
        interests: interestsResults 
      }));
    }
  }, [interestsResults, dispatch]);

  const handleContinue = () => {
    navigate('/quizzes');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full text-center bg-white rounded-lg shadow-md p-8">
        <div className="text-gray-400 mb-2">results</div>
        
        <div className="mb-8">
          <img 
            src="/images/mirror-results.png" 
            alt="Mirror Results" 
            className="w-32 h-32 mx-auto"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"%3E%3Cpath fill="%23FFD700" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"%3E%3C/path%3E%3Cpath fill="%23FFD700" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"%3E%3C/path%3E%3C/svg%3E';
            }}
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">THIS IS YOU</h1>
        
        <p className="text-lg text-gray-600 italic mb-8">
          "Peek into your future. Discover who you are — and what paths await you"
        </p>

        {interestsResults && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-800 mb-2">{interestsResults.area}</h2>
            <p className="text-gray-700">{interestsResults.description}</p>
          </div>
        )}
        
        <button 
          onClick={handleContinue}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Continue to Quizzes
        </button>
      </div>
    </div>
  );
};

export default MirrorGameEnd;