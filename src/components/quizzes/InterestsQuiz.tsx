import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { nextQuestion, prevQuestion, saveInterestsResults, setCurrentQuiz } from '../../redux/slices/quizSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    emoji?: string;
  }[];
  multiSelect?: boolean;
  maxSelect?: number;
}

const questions: Question[] = [
  {
    id: "subjects",
    question: "Which school subjects do you enjoy the most?",
    options: [
      { value: "math", label: "Math", emoji: "🧮" },
      { value: "science", label: "Biology / Chemistry / Physics", emoji: "🧪" },
      { value: "language", label: "Albanian Language or Literature", emoji: "📚" },
      { value: "history", label: "History / Civics", emoji: "🏛️" },
      { value: "art", label: "Art / Music / Drama", emoji: "🎨" },
      { value: "computers", label: "Computers / Technology", emoji: "💻" },
      { value: "business", label: "Business / Economics", emoji: "💼" },
      { value: "sports", label: "Physical Education / Sports", emoji: "🏃" },
      { value: "languages", label: "Foreign Languages", emoji: "🌍" }
    ],
    multiSelect: true,
    maxSelect: 3
  },
  {
    id: "activities",
    question: "What types of activities do you enjoy?",
    options: [
      { value: "problem-solving", label: "Solving problems or doing math exercises", emoji: "🧠" },
      { value: "designing", label: "Designing, drawing, or creating things", emoji: "🎨" },
      { value: "experiments", label: "Doing science experiments or research", emoji: "🔬" },
      { value: "writing", label: "Writing stories, essays, or articles", emoji: "✍️" },
      { value: "helping", label: "Helping others or giving advice", emoji: "🤝" },
      { value: "organizing", label: "Organizing events or leading teams", emoji: "📋" },
      { value: "fixing", label: "Fixing things or using tools", emoji: "🛠️" },
      { value: "computers", label: "Using computers or building apps", emoji: "💻" },
      { value: "speaking", label: "Speaking or performing in front of people", emoji: "🎤" }
    ],
    multiSelect: true,
    maxSelect: 3
  },
  {
    id: "skills",
    question: "What are your strongest skills?",
    options: [
      { value: "logical", label: "Thinking logically and solving problems", emoji: "🧠" },
      { value: "communication", label: "Speaking clearly or writing well", emoji: "🗣️" },
      { value: "creativity", label: "Being creative and coming up with new ideas", emoji: "🎨" },
      { value: "empathy", label: "Understanding people's feelings and needs", emoji: "❤️" },
      { value: "leadership", label: "Leading or managing groups", emoji: "🧑‍💼" },
      { value: "technical", label: "Working with machines, tools, or technology", emoji: "🛠️" },
      { value: "organization", label: "Planning and staying organized", emoji: "🗂️" },
      { value: "learning", label: "Learning new things quickly", emoji: "⚡" }
    ],
    multiSelect: true,
    maxSelect: 3
  },
  {
    id: "problem-solving",
    question: "How do you like to solve problems?",
    options: [
      { value: "analytical", label: "I break it down step by step and look for the best answer", emoji: "🔍" },
      { value: "creative", label: "I try creative solutions or think outside the box", emoji: "🎨" },
      { value: "collaborative", label: "I talk to others and listen to their ideas", emoji: "🗣️" },
      { value: "experimental", label: "I try different ways and learn as I go", emoji: "🧪" }
    ]
  },
  {
    id: "job-priorities",
    question: "What matters most to you in a future job?",
    options: [
      { value: "salary", label: "Earning a good salary", emoji: "💰" },
      { value: "meaning", label: "Doing something meaningful or helpful", emoji: "❤️" },
      { value: "stability", label: "Having a stable and secure career", emoji: "🛡️" },
      { value: "creativity", label: "Expressing myself or being creative", emoji: "🎨" },
      { value: "challenge", label: "Solving hard problems or challenges", emoji: "🧩" },
      { value: "technology", label: "Working with the latest technology", emoji: "💻" },
      { value: "balance", label: "Having a flexible and balanced life", emoji: "⚖️" },
      { value: "leadership", label: "Becoming a leader or running my own business", emoji: "👔" }
    ],
    multiSelect: true,
    maxSelect: 3
  },
  {
    id: "workplace",
    question: "What kind of place would you like to work in?",
    options: [
      { value: "office", label: "An office or business environment", emoji: "🏢" },
      { value: "medical", label: "A hospital or medical center", emoji: "🏥" },
      { value: "lab", label: "A science lab or research center", emoji: "🧪" },
      { value: "studio", label: "A creative studio or media room", emoji: "🎬" },
      { value: "school", label: "A school or educational setting", emoji: "🏫" },
      { value: "outdoors", label: "Outdoors or in different locations", emoji: "🌲" },
      { value: "workshop", label: "A workshop or technical setting", emoji: "🛠️" },
      { value: "remote", label: "Online or remotely", emoji: "🌐" },
      { value: "business", label: "Running my own business", emoji: "👨‍💼" }
    ],
    multiSelect: true,
    maxSelect: 2
  },
  {
    id: "personality",
    question: "Which sentence best describes you?",
    options: [
      { value: "analytical", label: "I like to understand how things work and solve problems", emoji: "🧠" },
      { value: "creative", label: "I love being creative and expressing myself", emoji: "🎨" },
      { value: "helping", label: "I care about people and want to help them", emoji: "🤝" },
      { value: "ambitious", label: "I'm ambitious and want to lead or succeed", emoji: "📈" },
      { value: "practical", label: "I enjoy working with my hands or fixing things", emoji: "🛠️" }
    ]
  },
  {
    id: "problems",
    question: "What kind of problems do you enjoy solving?",
    options: [
      { value: "puzzles", label: "Puzzles or strategy challenges", emoji: "🧩" },
      { value: "emotional", label: "Emotional conflicts or misunderstandings", emoji: "🤔" },
      { value: "design", label: "Creative design problems", emoji: "🎨" },
      { value: "social", label: "Big social or ethical questions", emoji: "⚖️" }
    ]
  },
  {
    id: "values",
    question: "What do you care most about in life?",
    options: [
      { value: "understanding", label: "Understanding the world", emoji: "🌍" },
      { value: "helping", label: "Helping people feel better", emoji: "🤝" },
      { value: "expression", label: "Expressing myself freely", emoji: "🎨" },
      { value: "challenges", label: "Solving big challenges", emoji: "🧠" }
    ]
  },
  {
    id: "self-description",
    question: "Which describes you best?",
    options: [
      { value: "logical", label: "Logical and curious", emoji: "🧠" },
      { value: "empathetic", label: "Empathetic and intuitive", emoji: "❤️" },
      { value: "creative", label: "Creative and expressive", emoji: "🎨" },
      { value: "confident", label: "Confident and driven", emoji: "💼" }
    ]
  },
  {
    id: "media-preference",
    question: "What type of books or media do you enjoy most?",
    options: [
      { value: "mystery", label: "Mystery or science fiction", emoji: "🕵️" },
      { value: "drama", label: "Drama or romance", emoji: "💕" },
      { value: "art", label: "Art, photography, or poetry", emoji: "🎨" },
      { value: "politics", label: "History, politics, or social issues", emoji: "🗳️" }
    ]
  },
  {
    id: "satisfaction",
    question: "What gives you the most satisfaction?",
    options: [
      { value: "solving", label: "Solving something others couldn't", emoji: "🧠" },
      { value: "understanding", label: "Making someone feel understood", emoji: "🤗" },
      { value: "creating", label: "Creating something beautiful", emoji: "✨" },
      { value: "changing", label: "Changing how people see the world", emoji: "🌍" }
    ]
  },
  {
    id: "work-day",
    question: "What sounds like the perfect workday to you?",
    options: [
      { value: "computer", label: "Solving problems on a computer", emoji: "💻" },
      { value: "helping", label: "Helping people face-to-face", emoji: "🧑‍⚕️" },
      { value: "creating", label: "Creating something new or artistic", emoji: "🎨" },
      { value: "managing", label: "Managing tasks and leading a team", emoji: "📊" }
    ]
  },
  {
    id: "motivation",
    question: "What motivates you the most in a job?",
    options: [
      { value: "money", label: "High salary and benefits", emoji: "💰" },
      { value: "impact", label: "Making a difference for others", emoji: "🌍" },
      { value: "expression", label: "Freedom to express myself", emoji: "🖌️" },
      { value: "advancement", label: "Achieving goals and getting promoted", emoji: "📈" }
    ]
  },
  {
    id: "excitement",
    question: "Which of these sounds more exciting?",
    options: [
      { value: "app", label: "Building a mobile app", emoji: "📱" },
      { value: "event", label: "Planning an event for students", emoji: "📆" },
      { value: "design", label: "Designing a new logo for a company", emoji: "🧑‍🎨" },
      { value: "helping", label: "Helping a friend through a hard time", emoji: "🤝" }
    ]
  },
  {
    id: "task-preference",
    question: "What type of tasks do you enjoy the most?",
    options: [
      { value: "analyzing", label: "Analyzing and solving problems", emoji: "🧠" },
      { value: "teaching", label: "Talking, explaining, and guiding people", emoji: "👩‍🏫" },
      { value: "creating", label: "Making or designing something", emoji: "🎨" },
      { value: "organizing", label: "Organizing, planning, and getting things done", emoji: "🗂️" }
    ]
  },
  {
    id: "career-desire",
    question: "What do you want most from your future career?",
    options: [
      { value: "freedom", label: "A lot of personal freedom", emoji: "🕊️" },
      { value: "impact", label: "To help others or make an impact", emoji: "❤️" },
      { value: "expert", label: "To become an expert in my field", emoji: "📚" },
      { value: "excitement", label: "To always have something exciting to do", emoji: "🌈" }
    ]
  },
  {
    id: "job-style",
    question: "What's your dream job style?",
    options: [
      { value: "technical", label: "Creating products or solving technical issues", emoji: "⚙️" },
      { value: "leadership", label: "Leading a team or starting a business", emoji: "👔" },
      { value: "helping", label: "Helping people feel better or succeed", emoji: "🧑‍⚕️" },
      { value: "creative", label: "Expressing ideas through writing or visuals", emoji: "📝" }
    ]
  }
];

const InterestsQuiz: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentQuestion } = useSelector((state: RootState) => state.quiz);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Initialize quiz state in Redux
  useEffect(() => {
    dispatch(setCurrentQuiz('interests'));
  }, [dispatch]);

  const currentQ = questions[currentQuestionIndex];
  const isMultiSelect = currentQ.multiSelect || false;
  const maxSelect = currentQ.maxSelect || 1;
  
  const handleSingleOptionSelect = (questionId: string, optionValue: string) => {
    setAnswers({ ...answers, [questionId]: optionValue });
  };
  
  const handleMultiOptionSelect = (questionId: string, optionValue: string) => {
    const currentSelections = answers[questionId] as string[] || [];
    let newSelections: string[];
    
    if (currentSelections.includes(optionValue)) {
      // Remove if already selected
      newSelections = currentSelections.filter(val => val !== optionValue);
    } else {
      // Add if not at max selections
      if (currentSelections.length < maxSelect) {
        newSelections = [...currentSelections, optionValue];
      } else {
        // Replace the first selection if at max
        newSelections = [...currentSelections.slice(1), optionValue];
      }
    }
    
    setAnswers({ ...answers, [questionId]: newSelections });
  };
  
  const handleOptionSelect = (questionId: string, optionValue: string) => {
    if (isMultiSelect) {
      handleMultiOptionSelect(questionId, optionValue);
    } else {
      handleSingleOptionSelect(questionId, optionValue);
    }
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
  
  const skipToResults = () => {
    // Navigate to the interests selection screen where they can choose directly
    navigate('/quizzes/interests-selection');
  };
  
  const calculateResults = () => {
    // In a real app, this would analyze all answers to determine areas of interest
    // For this demo, we'll just use a fixed result as specified in your instructions
    const result = {
      area: "Arts & Media",
      description: "You're creative, expressive, and have a strong interest in visual or performing arts. Fields like design, media production, or digital arts would let you combine technical skills with creativity."
    };
    
    // Save results to Redux store
    dispatch(saveInterestsResults(result));
  };
  
  const isQuestionAnswered = () => {
    const answer = answers[currentQ.id];
    if (!answer) return false;
    
    if (isMultiSelect) {
      return (answer as string[]).length > 0;
    }
    return true;
  };
  
  const getOptionState = (optionValue: string) => {
    const answer = answers[currentQ.id];
    if (!answer) return false;
    
    if (isMultiSelect) {
      return (answer as string[])?.includes(optionValue) || false;
    }
    return answer === optionValue;
  };

  // If showing results
  if (showResults) {
    const result = {
      area: "Arts & Media",
      description: "You're creative, expressive, and have a strong interest in visual or performing arts. Fields like design, media production, or digital arts would let you combine technical skills with creativity."
    };
    
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Results</h1>
          
          <div className="flex items-center justify-center my-6">
            <div className="bg-blue-100 rounded-full h-24 w-24 flex items-center justify-center text-4xl">
              🎨
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-2">Our top pick!: "{result.area}"</h2>
            <p className="text-gray-600">{result.description}</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/quizzes/results')}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
            
            <button
              onClick={() => navigate('/quizzes/interests-selection')}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-500">Interest Quiz</h2>
            <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h1>
        
        <div className="space-y-4">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left p-4 rounded-lg border ${
                getOptionState(option.value)
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleOptionSelect(currentQ.id, option.value)}
            >
              <div className="flex items-center">
                {option.emoji && <span className="mr-3 text-xl">{option.emoji}</span>}
                <span>{option.label}</span>
                
                {isMultiSelect && getOptionState(option.value) && (
                  <span className="ml-auto bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    {(answers[currentQ.id] as string[]).indexOf(option.value) + 1}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
        
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
              className="px-6 py-2 text-blue-600 hover:underline"
              onClick={skipToResults}
            >
              Skip to Selection
            </button>
            
            <button
              className={`px-6 py-2 rounded ${
                isQuestionAnswered()
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-300 text-white cursor-not-allowed'
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

export default InterestsQuiz;