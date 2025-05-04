import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchUniversities } from '../../redux/slices/universitySlice';
import { fetchCalendarEvents } from '../../redux/slices/calendarSlice';
import { fetchArticles } from '../../redux/slices/articleSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { universities } = useSelector((state: RootState) => state.university);
  const { events } = useSelector((state: RootState) => state.calendar);
  const { articles } = useSelector((state: RootState) => state.article);
  
  useEffect(() => {
    // Fetch data for the dashboard
    dispatch(fetchUniversities());
    dispatch(fetchCalendarEvents());
    dispatch(fetchArticles());
  }, [dispatch]);
  
  // Get top 5 university recommendations (in a real app, this would be personalized)
  const topUniversities = universities.slice(0, 5);
  
  // Get upcoming events (next 5 days)
  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 5);
  
  const upcomingEvents = events
    .filter(event => event.date >= today && event.date <= fiveDaysLater)
    .slice(0, 3);
  
  // Get latest articles
  const latestArticles = articles.slice(0, 3);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Top University Picks */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top University Picks For You</h2>
            
            <div className="space-y-4">
              {topUniversities.map((university) => (
                <div key={university.id} className="flex items-center p-3 border-b">
                  <img src={university.logo} alt={university.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{university.name}</h3>
                    <p className="text-sm text-gray-500">{university.location}</p>
                  </div>
                  <Link
                    to={`/university-browser/${university.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
            
            <Link to="/university-browser" className="block text-center mt-4 text-blue-600 hover:underline">
              View All Universities
            </Link>
          </div>
          
          {/* Personality Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Personality</h2>
            
            {user?.quizResults?.interests ? (
              <div>
                <h3 className="font-semibold text-lg text-blue-600 mb-2">{user.quizResults.interests.area}</h3>
                <p className="text-gray-700">{user.quizResults.interests.description}</p>
                <div className="mt-4 text-sm">
                  <span className="text-gray-500">Based on your Interests Quiz results</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">Complete the Interests Quiz to discover your academic personality</p>
                <Link
                  to="/quizzes"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Take Quiz Now
                </Link>
              </div>
            )}
          </div>
          
          {/* Latest Articles */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Articles</h2>
            
            <div className="space-y-4">
              {latestArticles.map((article) => (
                <div key={article.id} className="flex items-start p-3 border-b">
                  <img src={article.image} alt={article.title} className="w-20 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{new Date(article.date).toLocaleDateString()}</p>
                    <Link
                      to={`/articles/${article.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/articles" className="block text-center mt-4 text-blue-600 hover:underline">
              View All Articles
            </Link>
          </div>
        </div>
        
        <div>
          {/* Messages */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
            
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">No new messages</p>
              <Link
                to="/live-chat"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Chat
              </Link>
            </div>
          </div>
          
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
              <Link to="/calendar" className="text-blue-600 hover:underline text-sm">
                View Calendar
              </Link>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">{event.date.toLocaleDateString()}</p>
                    <p className="text-sm text-gray-700">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No upcoming events</p>
            )}
          </div>
          
          {/* Announcements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Announcements</h2>
            
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                <h3 className="font-semibold">Application Deadlines Approaching</h3>
                <p className="text-sm text-gray-700">
                  Don't miss the application deadlines for fall admissions. Many universities close applications on June 1st.
                </p>
              </div>
              
              <div className="p-3 border-l-4 border-green-500 bg-green-50">
                <h3 className="font-semibold">University Open Days</h3>
                <p className="text-sm text-gray-700">
                  Check out upcoming virtual and in-person open days in the calendar section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;