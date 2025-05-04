import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentQuiz } from '../../redux/slices/quizSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const QuizSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleQuizSelect = (quizType: 'interests' | 'bachelors' | 'university') => {
    dispatch(setCurrentQuiz(quizType));
    navigate(`/quizzes/${quizType}`);
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Choose Your Quiz</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500 hover:shadow-lg transition cursor-pointer"
          onClick={() => handleQuizSelect('interests')}
        >
          <div className="text-4xl mb-4 text-center">🧩</div>
          <h2 className="text-xl font-bold text-center mb-2">Interests Quiz</h2>
          <p className="text-gray-600 text-center">
            Discover what academic fields match your personal interests and strengths.
          </p>
          <button 
            className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            onClick={() => handleQuizSelect('interests')}
          >
            Start This Quiz
          </button>
        </div>
        
        <div 
          className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500 hover:shadow-lg transition cursor-pointer"
          onClick={() => handleQuizSelect('bachelors')}
        >
          <div className="text-4xl mb-4 text-center">🎓</div>
          <h2 className="text-xl font-bold text-center mb-2">Bachelor's Quiz</h2>
          <p className="text-gray-600 text-center">
            Find the perfect bachelor's degree program based on your academic preferences.
          </p>
          <button 
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={() => handleQuizSelect('bachelors')}
          >
            Start This Quiz
          </button>
        </div>
        
        <div 
          className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500 hover:shadow-lg transition cursor-pointer"
          onClick={() => handleQuizSelect('university')}
        >
          <div className="text-4xl mb-4 text-center">🏛️</div>
          <h2 className="text-xl font-bold text-center mb-2">University Quiz</h2>
          <p className="text-gray-600 text-center">
            Identify universities that match your preferences for location, size, and campus culture.
          </p>
          <button 
            className="mt-6 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
            onClick={() => handleQuizSelect('university')}
          >
            Start This Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;