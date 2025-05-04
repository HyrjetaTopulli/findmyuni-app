import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchUniversities, filterUniversities, resetFilters, addToCompareList, removeFromCompareList } from '../../redux/slices/universitySlice';
import { Link } from 'react-router-dom';
import { University } from '../../types';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const UniversityBrowser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredUniversities, isLoading, error, compareList } = useSelector(
    (state: RootState) => state.university
  );
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    tuitionMin: '',
    tuitionMax: '',
    duration: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  
  useEffect(() => {
    dispatch(fetchUniversities());
  }, [dispatch]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  
  const applyFilters = () => {
    dispatch(filterUniversities({
      location: filters.location,
      tuitionMin: filters.tuitionMin ? parseInt(filters.tuitionMin) : undefined,
      tuitionMax: filters.tuitionMax ? parseInt(filters.tuitionMax) : undefined,
      duration: filters.duration ? parseInt(filters.duration) : undefined,
    }));
    setShowFilters(false);
  };
  
  const resetAllFilters = () => {
    setFilters({
      location: '',
      tuitionMin: '',
      tuitionMax: '',
      duration: '',
    });
    dispatch(resetFilters());
    setShowFilters(false);
  };
  
  const toggleCompare = (university: University) => {
    if (compareList.find(uni => uni.id === university.id)) {
      dispatch(removeFromCompareList(university));
    } else if (compareList.length < 3) {
      dispatch(addToCompareList(university));
    }
  };
  
  // Filter universities based on search query
  const filteredBySearch = searchQuery
    ? filteredUniversities.filter(uni => 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.bachelorDegrees.some(degree => 
          degree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          degree.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : filteredUniversities;
  
  if (isLoading) {
    return <div className="p-6 text-center">Loading universities...</div>;
  }
  
  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">University Browser</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search universities or programs..."
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <button
            className={`px-4 py-2 rounded ${
              compareList.length > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setShowCompare(!showCompare)}
            disabled={compareList.length === 0}
          >
            Compare ({compareList.length})
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                className="w-full p-2 border border-gray-300 rounded"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="">All Locations</option>
                <option value="Tirana">Tirana</option>
                <option value="Durres">Durres</option>
                <option value="Other">Other Cities</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tuition Min (Lek)</label>
              <input
                type="number"
                name="tuitionMin"
                placeholder="Minimum"
                className="w-full p-2 border border-gray-300 rounded"
                value={filters.tuitionMin}
                onChange={handleFilterChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tuition Max (Lek)</label>
              <input
                type="number"
                name="tuitionMax"
                placeholder="Maximum"
                className="w-full p-2 border border-gray-300 rounded"
                value={filters.tuitionMax}
                onChange={handleFilterChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Years)</label>
              <select
                name="duration"
                className="w-full p-2 border border-gray-300 rounded"
                value={filters.duration}
                onChange={handleFilterChange}
              >
                <option value="">Any Duration</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5+ Years</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 gap-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={resetAllFilters}
            >
              Reset
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {showCompare && compareList.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Compare Universities</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Criteria</th>
                  {compareList.map(uni => (
                    <th key={uni.id} className="px-4 py-2 text-left">
                      <div className="flex items-center">
                        <span>{uni.name}</span>
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => dispatch(removeFromCompareList(uni))}
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">Location</td>
                  {compareList.map(uni => (
                    <td key={uni.id} className="border px-4 py-2">{uni.location}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Tuition Range</td>
                  {compareList.map(uni => (
                    <td key={uni.id} className="border px-4 py-2">
                      {uni.tuition.min.toLocaleString()} - {uni.tuition.max.toLocaleString()} Lek
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Duration</td>
                  {compareList.map(uni => (
                    <td key={uni.id} className="border px-4 py-2">{uni.duration} years</td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Min GPA</td>
                  {compareList.map(uni => (
                    <td key={uni.id} className="border px-4 py-2">{uni.minGPA || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Programs</td>
                  {compareList.map(uni => (
                    <td key={uni.id} className="border px-4 py-2">
                      {uni.bachelorDegrees.length} programs
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Actions</td>
                  {compareList.map(uni => (
                    <td key={uni.id} className="border px-4 py-2">
                      <Link
                        to={`/university-browser/${uni.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBySearch.length > 0 ? (
          filteredBySearch.map(university => (
            <div key={university.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <img 
                    src={university.logo} 
                    alt={university.name} 
                    className="w-16 h-16 object-contain" 
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"%3E%3Crect fill="%23f3f4f6" width="24" height="24"/%3E%3Cpath fill="%23d1d5db" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"%3E%3C/path%3E%3C/svg%3E';
                    }}
                  />
                  <button
                    onClick={() => toggleCompare(university)}
                    className={`px-3 py-1 rounded text-sm ${
                      compareList.find(uni => uni.id === university.id)
                        ? 'bg-blue-100 text-blue-700 border border-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {compareList.find(uni => uni.id === university.id) ? 'Added to Compare' : 'Compare'}
                  </button>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-2">{university.name}</h2>
                <p className="text-gray-600 mb-4">{university.address}</p>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Tuition: {university.tuition.min.toLocaleString()} - {university.tuition.max.toLocaleString()} Lek</span>
                  <span>{university.duration} years</span>
                </div>
                
                <p className="text-gray-700 mb-6 line-clamp-3">{university.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {university.bachelorDegrees.slice(0, 3).map(degree => (
                    <span key={degree.id} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {degree.name}
                    </span>
                  ))}
                  {university.bachelorDegrees.length > 3 && (
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      +{university.bachelorDegrees.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>
                  
                  <Link
                    to={`/university-browser/${university.id}`}
                    className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">No universities found matching your criteria.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={resetAllFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityBrowser;