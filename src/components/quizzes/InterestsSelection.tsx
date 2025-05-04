import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { saveInterestsResults } from '../../redux/slices/quizSlice';

const interestOptions = [
  { id: 'arts', name: 'Arts & Media', description: "You're creative, expressive, and have a strong interest in visual or performing arts." },
  { id: 'business', name: 'Business & Econ', description: "You have strong analytical abilities and enjoy leadership, strategy, and working with financial concepts." },
  { id: 'computers', name: 'Computer & IT', description: "You excel at logical thinking and enjoy working with technology and solving complex problems." },
  { id: 'education', name: 'Education', description: "You're patient, communicative, and find satisfaction in helping others learn and grow." },
  { id: 'engineering', name: 'Engineering', description: "You enjoy applying scientific principles to design and build structures, machines, or systems." },
  { id: 'health', name: 'Health Sciences', description: "You're compassionate, detail-oriented, and interested in promoting health and treating illness." },
  { id: 'humanities', name: 'Humanities', description: "You have strong language skills and enjoy exploring culture, literature, and human experience." },
  { id: 'sciences', name: 'Natural Sciences', description: "You're curious about the natural world and enjoy investigating scientific phenomena." },
  { id: 'sports', name: 'Physical Education & Sports', description: "You're active, energetic, and enjoy promoting fitness and working with physical abilities." },
  { id: 'social', name: 'Social Sciences', description: "You're interested in human behavior, society, and enjoy studying how people interact." }
];

const InterestsSelection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedInterest, setSelectedInterest] = useState('');

  const handleInterestSelect = (interestId: string) => {
    setSelectedInterest(interestId);
  };

  const handleConfirm = () => {
    if (!selectedInterest) return;

    const selectedOption = interestOptions.find(option => option.id === selectedInterest);
    if (selectedOption) {
      dispatch(saveInterestsResults({
        area: selectedOption.name,
        description: selectedOption.description
      }));
      navigate('/quizzes/bachelors');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Interest Area</h1>
          <p className="text-gray-600">Select the field that most interests you for your future studies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {interestOptions.map((option) => (
            <button
              key={option.id}
              className={`p-4 text-left rounded-lg border ${
                selectedInterest === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleInterestSelect(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-6 text-gray-500">
            I haven't made up my mind yet. Go to{' '}
            <button 
              className="text-blue-600 hover:underline"
              onClick={() => navigate('/quizzes/interests')}
            >
              QUIZ →
            </button>
          </p>

          <button
            className={`px-8 py-3 rounded-md ${
              selectedInterest
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleConfirm}
            disabled={!selectedInterest}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestsSelection;