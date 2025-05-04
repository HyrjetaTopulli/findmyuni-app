import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveInterestsResults } from '../../redux/slices/quizSlice';

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    image: string;
    alt: string;
  }[];
}

const questions: Question[] = [
  {
    id: "environment",
    question: "You open your eyes and you're in your future world. What kind of place surrounds you?",
    options: [
      { value: "lab", label: "A lab full of tools, formulas, and quiet focus", image: "/images/q1a1.png", alt: "A lab full of tools, formulas, and quiet focus" },
      { value: "classroom", label: "A cozy, light-filled classroom with curious minds", image: "/images/q1a2.jpeg", alt: "A cozy, light-filled classroom with curious minds" },
      { value: "studio", label: "A creative studio alive with music, color, and design", image: "/images/q1a3.png", alt: "A creative studio alive with music, color, and design" },
      { value: "office", label: "A modern office buzzing with strategy and teamwork", image: "/images/q1a4.png", alt: "A modern office buzzing with strategy and teamwork" },
      { value: "outdoor", label: "A natural setting — outdoors, moving freely", image: "/images/q1a5.png", alt: "A natural setting — outdoors, moving freely" }
    ]
  },
  {
    id: "activity",
    question: "You zoom in on yourself. What are you doing?",
    options: [
      { value: "analyzing", label: "Testing or analyzing something", image: "/images/q2a1.png", alt: "Testing or analyzing something" },
      { value: "teaching", label: "Teaching or guiding others", image: "/images/q2a2.png", alt: "Teaching or guiding others" },
      { value: "creating", label: "Coming up with creative ideas or sketches", image: "/images/q2a3.png", alt: "Coming up with creative ideas or sketches" },
      { value: "managing", label: "Pitching, managing, or negotiating", image: "/images/q2a4.png", alt: "Pitching, managing, or negotiating" },
      { value: "advising", label: "Comforting, listening, or advising someone", image: "/images/q2a5.png", alt: "Comforting, listening, or advising someone" }
    ]
  },
  {
    id: "collaboration",
    question: "You notice the people around you. What kind of team are you part of?",
    options: [
      { value: "alone", label: "I work mostly alone — I like deep focus", image: "/images/q3a1.png", alt: "I work mostly alone — I like deep focus" },
      { value: "small-team", label: "A tight group of collaborators", image: "/images/q3a2.png", alt: "A tight group of collaborators" },
      { value: "mentor", label: "I'm guiding others — maybe I'm a mentor", image: "/images/q3a3.png", alt: "I'm guiding others — maybe I'm a mentor" },
      { value: "large-team", label: "A big, loud team — I feed off energy", image: "/images/q3a4.png", alt: "A big, loud team — I feed off energy" },
      { value: "tech", label: "Me and some powerful tools/tech — I let machines help me", image: "/images/q3a5.png", alt: "Me and some powerful tools/tech — I let machines help me" }
    ]
  },
  {
    id: "problem",
    question: "You're working on something important. What's the mission?",
    options: [
      { value: "discover", label: "Discovering something new or complex", image: "/images/q4a1.png", alt: "Discovering something new or complex" },
      { value: "help", label: "Helping someone overcome a personal challenge", image: "/images/q4a2.png", alt: "Helping someone overcome a personal challenge" },
      { value: "express", label: "Expressing or creating something meaningful", image: "/images/q4a3.png", alt: "Expressing or creating something meaningful" },
      { value: "change", label: "Making a difference in the world", image: "/images/q4a4.png", alt: "Making a difference in the world" },
      { value: "improve", label: "Improving how something works or runs", image: "/images/q4a5.png", alt: "Improving how something works or runs" }
    ]
  },
  {
    id: "pride",
    question: "You finish your day. What moment made you feel proud?",
    options: [
      { value: "solving", label: "Solving something others couldn't", image: "/images/q5a1.jpg", alt: "Solving something others couldn't" },
      { value: "helping", label: "Helping someone grow", image: "/images/q5a2.jpg", alt: "Helping someone grow" },
      { value: "creating", label: "Seeing something you created come to life", image: "/images/q5a3.jpg", alt: "Seeing something you created come to life" },
      { value: "running", label: "Running something big or complex", image: "/images/q5a4.jpg", alt: "Running something big or complex" },
      { value: "changing", label: "Knowing you helped change a life or a system", image: "/images/q5a5.jpg", alt: "Knowing you helped change a life or a system" }
    ]
  },
  {
    id: "identity",
    question: "The mirror reflects a word behind you. It glows. What does it say?",
    options: [
      { value: "inventor", label: "Inventor", image: "/images/q6a1.png", alt: "Inventor" },
      { value: "creator", label: "Creator", image: "/images/q6a2.png", alt: "Creator" },
      { value: "healer", label: "Healer", image: "/images/q6a3.png", alt: "Healer" },
      { value: "leader", label: "Leader", image: "/images/q6a4.png", alt: "Leader" },
      { value: "explorer", label: "Explorer", image: "/images/q6a5.png", alt: "Explorer" },
      { value: "guide", label: "Guide", image: "/images/q6a6.png", alt: "Guide" }
    ]
  }
];

// Fallback images for testing when actual images aren't available
const fallbackImages = {
  environment: [
    'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 24 24"%3E%3Crect fill="%23F9A826" width="24" height="24"/%3E%3Cpath fill="%23FFF" d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z"%3E%3C/path%3E%3C/svg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 24 24"%3E%3Crect fill="%234CAF50" width="24" height="24"/%3E%3Cpath fill="%23FFF" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"%3E%3C/path%3E%3C/svg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 24 24"%3E%3Crect fill="%23E91E63" width="24" height="24"/%3E%3Cpath fill="%23FFF" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"%3E%3C/path%3E%3C/svg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 24 24"%3E%3Crect fill="%233F51B5" width="24" height="24"/%3E%3Cpath fill="%23FFF" d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"%3E%3C/path%3E%3C/svg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 24 24"%3E%3Crect fill="%23009688" width="24" height="24"/%3E%3Cpath fill="%23FFF" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"%3E%3C/path%3E%3C/svg%3E'
  ],
  // Similar arrays for other question types...
};

// Function to get fallback image based on question ID and option index
const getFallbackImage = (questionId: string, index: number): string => {
  const fallbackArray = fallbackImages[questionId as keyof typeof fallbackImages];
  if (!fallbackArray) return '';
  return fallbackArray[index % fallbackArray.length];
};

const MirrorGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOptionSelect = (questionId: string, optionValue: string) => {
    setAnswers({ ...answers, [questionId]: optionValue });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate results and navigate to the next page
      calculateResults();
      navigate('/games/mirror-game/end');
    }
  };

  const calculateResults = () => {
    // Map answers to career fields
    const fieldMapping: Record<string, { field: string, description: string }> = {
      inventor: { 
        field: "STEM & Technology", 
        description: "You're analytical, precise, and love solving complex problems. Consider fields in science, technology, engineering, or mathematics where you can innovate and discover." 
      },
      creator: { 
        field: "Arts & Media", 
        description: "You're imaginative, expressive, and visually oriented. Fields in design, visual arts, music, or digital media would let your creativity flourish." 
      },
      healer: { 
        field: "Health & Wellness", 
        description: "You're empathetic, caring, and focused on helping others. Consider careers in healthcare, psychology, counseling, or social services." 
      },
      leader: { 
        field: "Business & Management", 
        description: "You're strategic, decisive, and good with people. Business, management, entrepreneurship, or leadership roles would suit your strengths." 
      },
      explorer: { 
        field: "Research & Discovery", 
        description: "You're curious, independent, and love learning new things. Research, academia, exploration, or investigative roles would harness your natural curiosity." 
      },
      guide: { 
        field: "Education & Training", 
        description: "You're supportive, clear, and enjoy sharing knowledge. Teaching, training, mentoring, or educational development would be fulfilling paths." 
      }
    };

    // Get the identity value (last question) or default to the most common answer pattern
    const identity = answers.identity || Object.values(answers)[0] || 'creator';
    const result = fieldMapping[identity];

    // Save the result to Redux
    dispatch(saveInterestsResults({
      area: result.field,
      description: result.description
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-sm text-gray-500">
          Question {currentQuestionIndex + 1}- {currentQuestion.id.charAt(0).toUpperCase() + currentQuestion.id.slice(1)}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-center mb-8">
            "{currentQuestion.question}"
          </h2>
          
          <div className={`grid ${currentQuestion.options.length > 5 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {currentQuestion.options.map((option, index) => (
              <div 
                key={option.value}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion.id] === option.value 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
                onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
              >
                <div className="flex flex-col items-center">
                  <img 
                    src={option.image} 
                    alt={option.alt}
                    className="w-full h-36 object-contain mb-4"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = getFallbackImage(currentQuestion.id, index);
                    }}
                  />
                  <p className="text-center text-sm">{option.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            className={`px-8 py-3 rounded-md ${
              isAnswered 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleNext}
            disabled={!isAnswered}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MirrorGame;