import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchUniversities, setSelectedUniversity } from '../../redux/slices/universitySlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const UniversityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { universities, selectedUniversity, isLoading } = useSelector(
    (state: RootState) => state.university
  );
  
  useEffect(() => {
    if (universities.length === 0) {
      dispatch(fetchUniversities());
    } else if (id) {
      const university = universities.find(uni => uni.id === id);
      if (university) {
        dispatch(setSelectedUniversity(university));
      }
    }
  }, [dispatch, universities, id]);
  
  if (isLoading) {
    return <div className="p-6 text-center">Loading university details...</div>;
  }
  
  if (!selectedUniversity) {
    return <div className="p-6 text-center">University not found</div>;
  }
  
  return (
    <div className="p-6">
      <Link to="/university-browser" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to University Browser
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={selectedUniversity.logo} 
                alt={selectedUniversity.name} 
                className="w-20 h-20 object-contain mr-4"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"%3E%3Crect fill="%23f3f4f6" width="24" height="24"/%3E%3Cpath fill="%23d1d5db" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"%3E%3C/path%3E%3C/svg%3E';
                }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{selectedUniversity.name}</h1>
                <p className="text-gray-600">{selectedUniversity.address}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a
                href={selectedUniversity.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Visit Website
              </a>
              
              <a
                href={`mailto:${selectedUniversity.contactEmail}`}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">Tuition Range</h3>
              <p className="text-lg">{selectedUniversity.tuition.min.toLocaleString()} - {selectedUniversity.tuition.max.toLocaleString()} Lek</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">Duration</h3>
              <p className="text-lg">{selectedUniversity.duration} years</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">Minimum GPA</h3>
              <p className="text-lg">{selectedUniversity.minGPA || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About {selectedUniversity.name}</h2>
            <p className="text-gray-700 leading-relaxed">{selectedUniversity.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bachelor's Degrees</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedUniversity.bachelorDegrees.map(degree => (
                <div key={degree.id} className="border rounded p-4 hover:bg-gray-50">
                  <h3 className="font-semibold text-blue-600 mb-1">{degree.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">Category: {degree.category}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    Languages: {degree.languagesOffered.join(', ')}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Price: {degree.pricing.toLocaleString()} Lek
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Virtual Campus Tour</h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View 360° Tour
                </button>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact a Student</h2>
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Want to learn about student life at {selectedUniversity.name}? Connect with current students directly.
                </p>
                <Link
                  to="/live-chat"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Chat with Students
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;