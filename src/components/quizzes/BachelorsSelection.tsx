import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { saveBachelorsResults } from '../../redux/slices/quizSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

// List of bachelor's programs from your document
const bachelorsPrograms = [
  { id: 'graphic-design', name: 'Graphic Design' },
  { id: 'communication-pr', name: 'Communication and Public Relations' },
  { id: 'communication', name: 'Communication' },
  { id: 'journalism', name: 'Journalism' },
  { id: 'visual-arts', name: 'Visual Arts' },
  { id: 'multimedia', name: 'Multimedia' },
  { id: 'musical-arts', name: 'Musical Arts' },
  { id: 'piano', name: 'Piano' },
  { id: 'kanto', name: 'Kanto' },
  { id: 'violin', name: 'Violin and Strings' },
  { id: 'performing-arts', name: 'Performing Arts' },
  { id: 'director', name: 'Director' },
  { id: 'acting', name: 'Acting' },
  { id: 'ballet', name: 'Ballet' },
  { id: 'design', name: 'Design' },
  { id: 'film-directing', name: 'Film Directing' },
  { id: 'cinematography', name: 'Cinematography' },
  { id: 'journalism-multimedia', name: 'Journalism and Multimedia Communication' },
  { id: 'ict', name: 'Technology of Information and Communication' },
  { id: 'interior-design', name: 'Interior and Product Design' }
];

const BachelorsSelection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { interestsResults } = useSelector((state: RootState) => state.quiz);
  const [selectedProgram, setSelectedProgram] = useState('');
  
  // If no interests result, redirect to interests quiz
  useEffect(() => {
    if (!interestsResults) {
      navigate('/quizzes/interests');
    }
  }, [interestsResults, navigate]);

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);
  };

  const handleConfirm = () => {
    if (!selectedProgram) return;

    const selectedOption = bachelorsPrograms.find(program => program.id === selectedProgram);
    if (selectedOption) {
      dispatch(saveBachelorsResults({
        selectedProgram: {
          id: selectedOption.id,
          name: selectedOption.name,
          match: 100,
          description: "You've directly selected this program based on your preferences."
        }
      }));
      navigate('/quizzes/university');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Bachelor's Program</h1>
          <p className="text-gray-600">Select the program that aligns with your career goals</p>
        </div>

        <div className="h-96 overflow-y-auto mb-8 pr-2">
          <div className="grid grid-cols-1 gap-3">
            {bachelorsPrograms.map((program) => (
              <button
                key={program.id}
                className={`p-3 text-left rounded-lg border ${
                  selectedProgram === program.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleProgramSelect(program.id)}
              >
                {program.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="mb-6 text-gray-500">
            I haven't made up my mind yet. Go to{' '}
            <button 
              className="text-blue-600 hover:underline"
              onClick={() => navigate('/quizzes/bachelors')}
            >
              QUIZ →
            </button>
          </p>

          <button
            className={`px-8 py-3 rounded-md ${
              selectedProgram
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleConfirm}
            disabled={!selectedProgram}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BachelorsSelection;