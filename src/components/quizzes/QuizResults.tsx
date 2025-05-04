import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { resetQuiz } from '../../redux/slices/quizSlice';
import { updateUserQuizResults } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

type QuizResult = any; // This is a temporary solution; ideally define proper types

const QuizResults: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { interestsResults, bachelorsResults, universityResults, currentQuiz } = useSelector((state: RootState) => state.quiz);
  
  let results: QuizResult = null;
  let nextQuiz: string | null = null;
  
  if (currentQuiz === 'interests') {
    results = interestsResults;
    nextQuiz = 'bachelors';
  } else if (currentQuiz === 'bachelors') {
    results = bachelorsResults;
    nextQuiz = 'university';
  } else {
    results = universityResults;
    nextQuiz = null;
  }
  
  // Update user profile with quiz results
  useEffect(() => {
    if (results && currentQuiz) {
      // Update the user's profile with the current quiz results
      if (currentQuiz === 'interests') {
        dispatch(updateUserQuizResults({ interests: results }));
      } else if (currentQuiz === 'bachelors') {
        dispatch(updateUserQuizResults({ bachelors: results }));
      } else if (currentQuiz === 'university') {
        dispatch(updateUserQuizResults({ university: results }));
      }
    }
  }, [results, currentQuiz, dispatch]);
  
  const handleNextQuiz = () => {
    if (nextQuiz) {
      dispatch(resetQuiz());
      navigate(`/quizzes/${nextQuiz}`);
    } else {
      // If there's no next quiz, we've completed all quizzes
      navigate('/dashboard');
    }
  };
  
  const handleRetakeQuiz = () => {
    dispatch(resetQuiz());
    navigate(`/quizzes/${currentQuiz}`);
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">{currentQuiz === 'interests' ? '🧩' : currentQuiz === 'bachelors' ? '🎓' : '🏛️'}</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Results</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            {results?.area || results?.selectedProgram?.name || "Your Results"}
          </h2>
          <p className="text-gray-600">
            {results?.description || results?.selectedProgram?.description || "Your quiz results have been saved."}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleRetakeQuiz}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          >
            Retake Quiz
          </button>
          
          <button
            onClick={handleNextQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {nextQuiz ? `Take ${nextQuiz.charAt(0).toUpperCase() + nextQuiz.slice(1)} Quiz` : 'Go to Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;