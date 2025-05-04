import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

// Import pages and components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Sidebar from './components/shared/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import UniversityBrowser from './components/universityBrowser/UniversityBrowser';
import UniversityDetail from './components/universityBrowser/UniversityDetail';
import QuizSelection from './components/quizzes/QuizSelection';
import InterestsQuiz from './components/quizzes/InterestsQuiz';
import InterestsSelection from './components/quizzes/InterestsSelection';
import BachelorsQuiz from './components/quizzes/BachelorsQuiz';
import BachelorsSelection from './components/quizzes/BachelorsSelection';
import UniversityQuiz from './components/quizzes/UniversityQuiz';
import UniversitySelection from './components/quizzes/UniversitySelection';
import QuizResults from './components/quizzes/QuizResults';
import Calendar from './components/calendar/Calendar';
import Articles from './components/articles/Articles';
import ArticleDetail from './components/articles/ArticleDetail';
import LiveChat from './components/liveChat/LiveChat';
import Profile from './components/profile/Profile';
import Games from './components/games/Games';
import MirrorGameIntro from './components/games/MirrorGameIntro';
import MirrorGame from './components/games/MirrorGame';
import MirrorGameEnd from './components/games/MirrorGameEnd';

// Private route wrapper
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1">
        {children}
      </div>
    </div>
  );
};

// Full screen route without sidebar
interface FullScreenRouteProps {
  children: React.ReactNode;
}

const FullScreenRoute: React.FC<FullScreenRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        
        <Route path="/university-browser" element={<PrivateRoute><UniversityBrowser /></PrivateRoute>} />
        <Route path="/university-browser/:id" element={<PrivateRoute><UniversityDetail /></PrivateRoute>} />
        
        {/* Quiz Routes */}
        <Route path="/quizzes" element={<PrivateRoute><QuizSelection /></PrivateRoute>} />
        <Route path="/quizzes/interests" element={<PrivateRoute><InterestsQuiz /></PrivateRoute>} />
        <Route path="/quizzes/interests-selection" element={<PrivateRoute><InterestsSelection /></PrivateRoute>} />
        <Route path="/quizzes/bachelors" element={<PrivateRoute><BachelorsQuiz /></PrivateRoute>} />
        <Route path="/quizzes/bachelors-selection" element={<PrivateRoute><BachelorsSelection /></PrivateRoute>} />
        <Route path="/quizzes/university" element={<PrivateRoute><UniversityQuiz /></PrivateRoute>} />
        <Route path="/quizzes/university-selection" element={<PrivateRoute><UniversitySelection /></PrivateRoute>} />
        <Route path="/quizzes/results" element={<PrivateRoute><QuizResults /></PrivateRoute>} />
        
        {/* Game Routes */}
        <Route path="/games" element={<PrivateRoute><Games /></PrivateRoute>} />
        <Route path="/games/mirror-game" element={<FullScreenRoute><MirrorGameIntro /></FullScreenRoute>} />
        <Route path="/games/mirror-game/questions" element={<FullScreenRoute><MirrorGame /></FullScreenRoute>} />
        <Route path="/games/mirror-game/end" element={<FullScreenRoute><MirrorGameEnd /></FullScreenRoute>} />
        
        <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
        <Route path="/articles" element={<PrivateRoute><Articles /></PrivateRoute>} />
        <Route path="/articles/:id" element={<PrivateRoute><ArticleDetail /></PrivateRoute>} />
        <Route path="/live-chat" element={<PrivateRoute><LiveChat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;