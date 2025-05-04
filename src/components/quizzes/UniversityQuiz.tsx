import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { saveUniversityResults, setCurrentQuiz } from '../../redux/slices/quizSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

interface Question {
  id: string;
  question: string;
  options: {
    value: string | number;
    label: string;
  }[];
  type?: 'scale' | 'select';
}

const questions: Question[] = [
  {
    id: "location",
    question: "How far are you comfortable being from the city center?",
    options: [
      { value: "very-close", label: "Very close (1–3)" },
      { value: "moderate", label: "Moderate distance (4–6)" },
      { value: "far", label: "Far is fine (7–10)" }
    ]
  },
  {
    id: "campus-life",
    question: "How important is an active campus life for you?",
    options: [
      { value: 1, label: "Not important" },
      { value: 2, label: "Somewhat important" },
      { value: 3, label: "Important" },
      { value: 4, label: "Very important" },
      { value: 5, label: "Essential" }
    ],
    type: 'scale'
  },
  {
    id: "class-time",
    question: "When do you prefer classes to be held?",
    options: [
      { value: "afternoon-only", label: "Only afternoon" },
      { value: "evening-only", label: "Only evening" },
      { value: "afternoon-usually", label: "Usually afternoon" },
      { value: "evening-usually", label: "Usually evening" },
      { value: "mixed", label: "Mixed" }
    ]
  },
  {
    id: "schedule-flexibility",
    question: "How much flexibility do you want in your class schedule?",
    options: [
      { value: "full-control", label: "I want full control" },
      { value: "some-flexibility", label: "Some flexibility is enough" },
      { value: "fixed", label: "I prefer fixed schedules" }
    ]
  },
  {
    id: "study-difficulty",
    question: "How hard do you want your studies to be?",
    options: [
      { value: 1, label: "Very easy" },
      { value: 2, label: "Easy" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "Challenging" },
      { value: 5, label: "Very challenging" }
    ],
    type: 'scale'
  },
  {
    id: "teachers",
    question: "How important are strong and knowledgeable teachers to you?",
    options: [
      { value: 1, label: "Not important" },
      { value: 2, label: "Somewhat important" },
      { value: 3, label: "Important" },
      { value: 4, label: "Very important" },
      { value: 5, label: "Essential" }
    ],
    type: 'scale'
  },
  {
    id: "academic-knowledge",
    question: "How important is gaining deep academic knowledge for your future?",
    options: [
      { value: 1, label: "Not important" },
      { value: 2, label: "Somewhat important" },
      { value: 3, label: "Important" },
      { value: 4, label: "Very important" },
      { value: 5, label: "Essential" }
    ],
    type: 'scale'
  },
  {
    id: "campus-quality",
    question: "How much do you care about the quality of the campus?",
    options: [
      { value: 1, label: "Not important" },
      { value: 2, label: "Somewhat important" },
      { value: 3, label: "Important" },
      { value: 4, label: "Very important" },
      { value: 5, label: "Essential" }
    ],
    type: 'scale'
  },
  {
    id: "tuition-sensitivity",
    question: "How sensitive are you to tuition pricing?",
    options: [
      { value: "cheapest", label: "I want the cheapest possible" },
      { value: "balanced", label: "Price matters, but it's not everything" },
      { value: "quality-first", label: "I want the best match regardless of cost" }
    ]
  }
];

// List of universities from your requirements
const universities = [
  { id: 'unyt', name: 'University of New York Tirana (UNYT)' },
  { id: 'albanian', name: 'Albanian University' },
  { id: 'uet', name: 'European University of Tirana (UET)' },
  { id: 'polis', name: 'Polis University' }
];

// Example university recommendation results
const universityResults = [
  {
    id: 10,
    degree: "Design",
    university: "University of New York Tirana (UNYT)",
    language: "English",
    tuition: 3600,
    match: 70,
    comments: "✅ Great teaching, 🎉 campus life, and 🏫 campus quality. 💸 Slightly expensive."
  },
  {
    id: 15,
    degree: "Graphic Design",
    university: "European University of Tirana (UET)",
    language: "Albanian",
    tuition: 3000,
    match: 55,
    comments: "👍 Mid-range price, 🤝 decent flexibility; 😐 less strong campus rating."
  },
  {
    id: 16,
    degree: "Graphic Design",
    university: "European University of Tirana (UET)",
    language: "Albanian",
    tuition: 4000,
    match: 48,
    comments: "💰 Higher cost, 🧑‍🏫 average teacher quality."
  },
  {
    id: 14,
    degree: "Graphic Design",
    university: "Albanian University",
    language: "Albanian",
    tuition: 1500,
    match: 42,
    comments: "✅ Very affordable 💵; ❌ weaker campus 🏢 and academic 📚 level."
  },
  {
    id: 17,
    degree: "Graphic Design",
    university: "Polis University",
    language: "Albanian",
    tuition: 3600,
    match: 39,
    comments: "😕 Less active campus 🎭, ⛔ strict schedule."
  }
];

const UniversityQuiz: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { interestsResults, bachelorsResults } = useSelector((state: RootState) => state.quiz);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Initialize quiz state in Redux
  useEffect(() => {
    dispatch(setCurrentQuiz('university'));

    // If no previous results, redirect to appropriate quiz
    if (!interestsResults) {
      navigate('/quizzes/interests');
    } else if (!bachelorsResults) {
      navigate('/quizzes/bachelors');
    }
  }, [dispatch, interestsResults, bachelorsResults, navigate]);

  const handleOptionSelect = (questionId: string, optionValue: string | number) => {
    setAnswers({ ...answers, [questionId]: optionValue });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate and show results
      setShowResults(true);
      calculateResults();
    }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const skipToSelection = () => {
    // Navigate to the university selection screen
    navigate('/quizzes/university-selection');
  };
  
  const calculateResults = () => {
    // In a real app, this would analyze all answers to determine matching universities
    // For this demo, we'll just use the fixed results from your requirements
    dispatch(saveUniversityResults({
      universities: universityResults
    }));
  };
  
  const isQuestionAnswered = () => {
    return answers[questions[currentQuestionIndex].id] !== undefined;
  };

  const renderScaleOption = (value: number) => {
    const labels = ['Not important', 'Somewhat important', 'Important', 'Very important', 'Essential'];
    return (
      <div className="flex flex-col items-center">
        <span className="text-2xl">{value}</span>
        <span className="text-sm text-gray-500">{labels[value - 1]}</span>
      </div>
    );
  };

  // If showing results
  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your University Matches</h1>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Degree</th>
                  <th className="px-4 py-2 text-left">University</th>
                  <th className="px-4 py-2 text-left">Language</th>
                  <th className="px-4 py-2 text-left">Tuition (€)</th>
                  <th className="px-4 py-2 text-left">Match %</th>
                  <th className="px-4 py-2 text-left">Comments</th>
                </tr>
              </thead>
              <tbody>
                {universityResults.map((result, index) => (
                  <tr key={result.id} className={index === 0 ? "bg-blue-50" : index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="border px-4 py-2">{result.degree}</td>
                    <td className="border px-4 py-2">{result.university}</td>
                    <td className="border px-4 py-2">{result.language}</td>
                    <td className="border px-4 py-2">{result.tuition}</td>
                    <td className="border px-4 py-2">{result.match}%</td>
                    <td className="border px-4 py-2">{result.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/quizzes/university-selection')}
              className="mr-4 px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
              Choose Different University
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const isScale = currentQuestion.type === 'scale';
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-500">University Preferences Quiz</h2>
            <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h1>
        
        {isScale ? (
          <div className="flex justify-between items-center mb-6">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                className={`w-16 h-16 rounded-full ${
                  answers[currentQuestion.id] === option.value
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
              >
                {option.value}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left p-4 rounded-lg border ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          <div>
            <button
              className={`px-6 py-2 rounded ${
                currentQuestionIndex > 0 
                  ? 'bg-gray-200 hover:bg-gray-300' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
          </div>
          
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 text-purple-600 hover:underline"
              onClick={skipToSelection}
            >
              Skip to Selection
            </button>
            
            <button
              className={`px-6 py-2 rounded ${
                isQuestionAnswered()
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-300 text-white cursor-not-allowed'
              }`}
              onClick={handleNext}
              disabled={!isQuestionAnswered()}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityQuiz;