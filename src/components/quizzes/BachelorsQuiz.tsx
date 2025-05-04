import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { saveBachelorsResults, setCurrentQuiz } from '../../redux/slices/quizSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    emoji?: string;
  }[];
}

// Using the Arts & Media Degree Quiz from your document
const questions: Question[] = [
  {
    id: "task-preference",
    question: "Which task would excite you the most?",
    options: [
      { value: "A", label: "Designing a brand logo", emoji: "🎨" },
      { value: "B", label: "Interviewing someone for a documentary", emoji: "🎙️" },
      { value: "C", label: "Writing a news article", emoji: "📰" },
      { value: "D", label: "Playing music at a live event", emoji: "🎻" }
    ]
  },
  {
    id: "environment",
    question: "Which environment feels more \"you\"?",
    options: [
      { value: "A", label: "An art studio with sketches everywhere", emoji: "🖼️" },
      { value: "B", label: "A media newsroom full of screens and mics", emoji: "📺" },
      { value: "C", label: "A theater preparing for a show", emoji: "🎭" },
      { value: "D", label: "A music conservatory with grand pianos", emoji: "🎹" }
    ]
  },
  {
    id: "inspiration",
    question: "What do you do when you feel inspired?",
    options: [
      { value: "A", label: "Draw or paint", emoji: "✏️" },
      { value: "B", label: "Start recording or editing something", emoji: "🎬" },
      { value: "C", label: "Write lyrics or poetry", emoji: "✍️" },
      { value: "D", label: "Play an instrument or sing", emoji: "🎶" }
    ]
  },
  {
    id: "directing-preference",
    question: "Which would you rather direct?",
    options: [
      { value: "A", label: "A short film", emoji: "🎥" },
      { value: "B", label: "A stage play", emoji: "🎬" },
      { value: "C", label: "A fashion show", emoji: "👗" },
      { value: "D", label: "A musical performance", emoji: "🎼" }
    ]
  },
  {
    id: "school-subject",
    question: "Which subject did you enjoy more in school?",
    options: [
      { value: "A", label: "Art or visual projects", emoji: "🎨" },
      { value: "B", label: "Drama or literature", emoji: "🎤" },
      { value: "C", label: "Music or performance", emoji: "🎵" },
      { value: "D", label: "Technology and video editing", emoji: "💻" }
    ]
  },
  {
    id: "compliments",
    question: "What do people usually compliment you on?",
    options: [
      { value: "A", label: "Your creativity or eye for design", emoji: "🎨" },
      { value: "B", label: "Your public speaking or presentation", emoji: "🗣️" },
      { value: "C", label: "Your emotional expression or acting", emoji: "😢" },
      { value: "D", label: "Your musical skill or rhythm", emoji: "🎼" }
    ]
  },
  {
    id: "enjoyable-activity",
    question: "Which activity sounds more enjoyable?",
    options: [
      { value: "A", label: "Designing posters and visuals for an event", emoji: "🖍️" },
      { value: "B", label: "Hosting a podcast or radio show", emoji: "🎙️" },
      { value: "C", label: "Acting in a school play", emoji: "🎭" },
      { value: "D", label: "Playing in an orchestra or band", emoji: "🎻" }
    ]
  },
  {
    id: "project-preference",
    question: "What type of project would you prefer?",
    options: [
      { value: "A", label: "Creating a visual identity for a company", emoji: "🧑‍🎨" },
      { value: "B", label: "Filming and editing a short story", emoji: "🎥" },
      { value: "C", label: "Performing a dance routine", emoji: "💃" },
      { value: "D", label: "Composing or arranging music", emoji: "🎹" }
    ]
  },
  {
    id: "dream-role",
    question: "Your dream role involves...",
    options: [
      { value: "A", label: "Being a designer or illustrator", emoji: "🖌️" },
      { value: "B", label: "A reporter or editor for media", emoji: "🗞️" },
      { value: "C", label: "Leading a creative team in theater or film", emoji: "🎬" },
      { value: "D", label: "Performing as a solo musician", emoji: "🎤" }
    ]
  },
  {
    id: "tool-preference",
    question: "Which tool would you most enjoy using?",
    options: [
      { value: "A", label: "Photoshop or Illustrator", emoji: "🖍️" },
      { value: "B", label: "Camera or video editing software", emoji: "📹" },
      { value: "C", label: "Microphone and voice recorder", emoji: "🎙️" },
      { value: "D", label: "Piano or violin", emoji: "🎹" }
    ]
  },
  {
    id: "free-day",
    question: "If you had a whole day free, you'd probably...",
    options: [
      { value: "A", label: "Sketch ideas for a comic or poster", emoji: "✏️" },
      { value: "B", label: "Watch documentaries or news reels", emoji: "🎞️" },
      { value: "C", label: "Rehearse a monologue or dance", emoji: "🎭" },
      { value: "D", label: "Play or compose music", emoji: "🎵" }
    ]
  },
  {
    id: "team-role",
    question: "You're assigned to a team project. Which role do you take?",
    options: [
      { value: "A", label: "Visual designer or slide creator", emoji: "🖼️" },
      { value: "B", label: "Presenter or interviewer", emoji: "🎤" },
      { value: "C", label: "Scriptwriter or stage manager", emoji: "📝" },
      { value: "D", label: "Soundtrack or theme composer", emoji: "🎼" }
    ]
  },
  {
    id: "quote",
    question: "Which quote resonates most?",
    options: [
      { value: "A", label: "Design is thinking made visual.", emoji: "🎨" },
      { value: "B", label: "The camera is an instrument of truth.", emoji: "📷" },
      { value: "C", label: "All the world's a stage.", emoji: "🎭" },
      { value: "D", label: "Music is what feelings sound like.", emoji: "🎵" }
    ]
  },
  {
    id: "proud-moment",
    question: "What would make you feel proud?",
    options: [
      { value: "A", label: "Seeing your designs published", emoji: "🖼️" },
      { value: "B", label: "Broadcasting a story to a big audience", emoji: "📣" },
      { value: "C", label: "Performing on stage to applause", emoji: "👏" },
      { value: "D", label: "Recording a professional track", emoji: "🎼" }
    ]
  },
  {
    id: "natural-talent",
    question: "What is your natural talent?",
    options: [
      { value: "A", label: "Visual creativity", emoji: "🖌️" },
      { value: "B", label: "Clear communication", emoji: "🗣️" },
      { value: "C", label: "Expressing emotions physically", emoji: "🎭" },
      { value: "D", label: "Musical ability", emoji: "🎶" }
    ]
  }
];

const programResults = [
  {
    id: "graphic-design",
    name: "Graphic Design",
    match: 92,
    description: "You're visually expressive, love digital creativity, and have a strong eye for layout, color, and meaning. This field will allow you to turn ideas into visual stories — perfect for your profile!"
  },
  {
    id: "interior-design",
    name: "Interior and Product Design",
    match: 86,
    description: "You care about how spaces feel and objects function. Your answers show that you enjoy combining creativity with purpose — which is exactly what this program is all about."
  },
  {
    id: "architecture",
    name: "Architecture",
    match: 79,
    description: "You're a systems thinker with a creative side. Architecture would challenge your structure-loving mindset while still letting you design environments that inspire."
  }
];

// Mapping of art & media degrees
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

const BachelorsQuiz: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { interestsResults } = useSelector((state: RootState) => state.quiz);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Initialize quiz state in Redux
  useEffect(() => {
    dispatch(setCurrentQuiz('bachelors'));

    // If no interests result, redirect to interests quiz
    if (!interestsResults) {
      navigate('/quizzes/interests');
    }
  }, [dispatch, interestsResults, navigate]);

  const handleOptionSelect = (questionId: string, optionValue: string) => {
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
    // Navigate to the bachelors selection screen
    navigate('/quizzes/bachelors-selection');
  };
  
  const calculateResults = () => {
    // In a real app, this would analyze all answers to determine matching programs
    // For this demo, we'll just use fixed results from the programResults array
    dispatch(saveBachelorsResults({
      topPrograms: programResults,
      selectedProgram: programResults[0]
    }));
  };
  
  const isQuestionAnswered = () => {
    return answers[questions[currentQuestionIndex].id] !== undefined;
  };

  // If showing results
  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Bachelor's Program Matches</h1>
          
          <div className="space-y-6 mb-8">
            {programResults.map((program, index) => (
              <div key={program.id} className={`
                p-6 rounded-lg 
                ${index === 0 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}
              `}>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {index === 0 && <span className="text-2xl">🥇</span>}
                    {index === 1 && <span className="text-2xl">🥈</span>}
                    {index === 2 && <span className="text-2xl">🥉</span>}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {index + 1}. {program.name} — {program.match}% Match
                    </h2>
                    <p className="text-gray-700 mt-2">{program.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg mb-8">
            <p className="text-gray-700">
              <span className="font-bold">✨ These results aren't just academic — they reflect who you are and how you think.</span><br/>
              Each program opens doors to exciting careers where creativity, design, and impact go hand in hand.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <p className="font-semibold mb-4">➡️ Ready to explore universities that offer these programs?</p>
            
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/quizzes/bachelors-selection')}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Change Program
              </button>
              
              <button
                onClick={() => navigate('/quizzes/university')}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Continue to University Quiz
              </button>
            </div>
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
            <h2 className="text-sm font-medium text-gray-500">Arts & Media Degree Quiz</h2>
            <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{questions[currentQuestionIndex].question}</h1>
        
        <div className="space-y-4">
          {questions[currentQuestionIndex].options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left p-4 rounded-lg border ${
                answers[questions[currentQuestionIndex].id] === option.value
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleOptionSelect(questions[currentQuestionIndex].id, option.value)}
            >
              <div className="flex items-center">
                {option.emoji && <span className="mr-3 text-xl">{option.emoji}</span>}
                <span>{option.label}</span>
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
              onClick={skipToSelection}
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

export default BachelorsQuiz;