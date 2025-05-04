import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/university-browser', label: 'University Browser', icon: '🏛️' },
    { path: '/quizzes', label: 'Quizzes', icon: '📝' },
    { path: '/games', label: 'Games', icon: '🎮' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/articles', label: 'Articles', icon: '📰' },
    { path: '/live-chat', label: 'Live Chat', icon: '💬' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];
  
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center justify-center mb-10">
        <img src="/images/FindMyUni_logo.png" alt="FindMyUni Logo" className="h-10" />
        
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-4">
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg ${
                  isActive(item.path) ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;