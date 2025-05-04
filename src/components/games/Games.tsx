import React from 'react';
import { Link } from 'react-router-dom';

const Games: React.FC = () => {
  const games = [
    {
      id: 'mirror-game',
      title: 'Mirror of the Future',
      description: 'Peek into your future and discover what career paths might suit you best.',
      image: '/images/last.png',
      difficulty: 'Easy',
      path: '/games/mirror-game'
    },
    {
      id: 'university-match',
      title: 'University Match',
      description: 'Match universities with their locations and famous alumni.',
      image: '/images/UniversityMatch.png',
      difficulty: 'Easy',
      path: '/games/university-match'
    },
    {
      id: 'degree-explorer',
      title: 'Degree Explorer',
      description: 'Explore different degrees and find out which one suits you best.',
      image: '/images/DegreeExplorer.png',
      difficulty: 'Medium',
      path: '/games/degree-explorer'
    },
    {
      id: 'campus-quest',
      title: 'Campus Quest',
      description: 'Navigate through a virtual campus and complete tasks to earn points.',
      image: '/images/CampusQuest.png',
      difficulty: 'Hard',
      path: '/games/campus-quest'
    },
  ];
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Educational Games</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect fill="%23CCCCCC" width="400" height="200"/%3E%3Ctext fill="%23666666" font-family="sans-serif" font-size="30" text-anchor="middle" x="200" y="100"%3E' + game.title + '%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-800">{game.title}</h2>
                <span className={`px-2 py-1 rounded text-xs ${
                  game.difficulty === 'Easy' 
                    ? 'bg-green-100 text-green-800' 
                    : game.difficulty === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {game.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{game.description}</p>
              
              <Link
                to={game.path}
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Play Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;