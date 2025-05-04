import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchArticles, setSelectedArticle } from '../../redux/slices/articleSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { articles, selectedArticle, isLoading } = useSelector(
    (state: RootState) => state.article
  );
  
  useEffect(() => {
    if (articles.length === 0) {
      dispatch(fetchArticles());
    } else if (id) {
      const article = articles.find(a => a.id === id);
      if (article) {
        dispatch(setSelectedArticle(article));
      }
    }
  }, [dispatch, articles, id]);
  
  if (isLoading) {
    return <div className="p-6 text-center">Loading article...</div>;
  }
  
  if (!selectedArticle) {
    return <div className="p-6 text-center">Article not found</div>;
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/articles" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Articles
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={selectedArticle.image} 
          alt={selectedArticle.title} 
          className="w-full h-64 object-cover"
        />
        
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedArticle.title}</h1>
          
          <div className="flex items-center text-gray-500 mb-6">
            <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{selectedArticle.category}</span>
          </div>
          
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p>{selectedArticle.content}</p>
            
            {/* For demonstration, let's add more paragraphs */}
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
              euismod, nisi nisl consequat nisi, euismod euismod nisi nisl euismod nisi. Nullam euismod,
              nisi vel consectetur euismod, nisi nisl consequat nisi, euismod euismod nisi nisl euismod nisi.
            </p>
            
            <p className="mt-4">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget 
              tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Key Insights</h2>
            
            <p>
              Curabitur aliquet quam id dui posuere blandit. Vivamus magna justo, lacinia eget consectetur sed,
              convallis at tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
            </p>
            
            <p className="mt-4">
              Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui
              posuere blandit. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia
              eget consectetur sed, convallis at tellus.
            </p>
          </div>
          
          {selectedArticle.universityId && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Related University</h3>
              <Link
                to={`/university-browser/${selectedArticle.universityId}`}
                className="text-blue-600 hover:underline"
              >
                View University Details
              </Link>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold text-gray-800 mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Share on Facebook
              </button>
              <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500">
                Share on Twitter
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Share on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;