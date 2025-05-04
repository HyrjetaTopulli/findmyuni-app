import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchArticles, setSelectedArticle } from '../../redux/slices/articleSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Articles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error } = useSelector((state: RootState) => state.article);
  
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);
  
  if (isLoading) {
    return <div className="p-6 text-center">Loading articles...</div>;
  }
  
  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }
  
  // Group articles by category
  const articlesByCategory: Record<string, typeof articles> = {};
  
  articles.forEach(article => {
    if (!articlesByCategory[article.category]) {
      articlesByCategory[article.category] = [];
    }
    articlesByCategory[article.category].push(article);
  });
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">University Articles</h1>
      
      {Object.keys(articlesByCategory).map(category => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-bold text-blue-800 mb-6 pb-2 border-b">
            {category}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesByCategory[category].map(article => (
              <div 
                key={article.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
                onClick={() => dispatch(setSelectedArticle(article))}
              >
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{new Date(article.date).toLocaleDateString()}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{article.content.substring(0, 120)}...</p>
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;