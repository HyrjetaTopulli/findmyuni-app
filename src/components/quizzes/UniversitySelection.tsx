import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { saveUniversityResults } from '../../redux/slices/quizSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

// List of universities from your requirements
const universities = [
  { id: 'unyt', name: 'University of New York Tirana (UNYT)' },
  { id: 'albanian', name: 'Albanian University' },
  { id: 'uet', name: 'European University of Tirana (UET)' },
  { id: 'polis', name: 'Polis University' }
];

const UniversitySelection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { interestsResults, bachelorsResults } = useSelector((state: RootState) => state.quiz);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  
  // If no previous results, redirect to appropriate quiz
  useEffect(() => {
    if (!interestsResults) {
      navigate('/quizzes/interests');
    } else if (!bachelorsResults) {
      navigate('/quizzes/bachelors');
    }
  }, [interestsResults, bachelorsResults, navigate]);

  const handleUniversitySelect = (universityId: string) => {
    setSelectedUniversity(universityId);
  };

  const handleConfirm = () => {
    if (!selectedUniversity) return;

    const selectedOption = universities.find(university => university.id === selectedUniversity);
    if (selectedOption) {
      // Create a recommendation result based on selection
      const selectedResult = {
        id: Date.now(),
        degree: bachelorsResults?.selectedProgram?.name || 'Graphic Design',
        university: selectedOption.name,
        language: 'Albanian/English',
        tuition: 3000,
        match: 100,
        comments: "You've directly selected this university based on your preferences."
      };

      dispatch(saveUniversityResults({
        universities: [selectedResult]
      }));
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Choose Your University</h1>
          <p className="text-gray-600">Select the university where you'd like to study</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {universities.map((university) => (
            <button
              key={university.id}
              className={`p-4 text-left rounded-lg border ${
                selectedUniversity === university.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleUniversitySelect(university.id)}
            >
              {university.name}
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-6 text-gray-500">
            I haven't made up my mind yet. Go to{' '}
            <button 
              className="text-purple-600 hover:underline"
              onClick={() => navigate('/quizzes/university')}
            >
              QUIZ →
            </button>
          </p>

          <button
            className={`px-8 py-3 rounded-md ${
              selectedUniversity
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleConfirm}
            disabled={!selectedUniversity}
          >
            Complete Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversitySelection;