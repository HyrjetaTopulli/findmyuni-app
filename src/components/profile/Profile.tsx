import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }
    
    // In a real app, this would update the user data in the backend
    setSuccess('Profile updated successfully');
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const handleDeleteAccount = () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmed) {
      // In a real app, this would delete the user account from the backend
      dispatch(logout());
      navigate('/login');
    }
  };
  
  if (!user) {
    return <div className="p-6 text-center">Please log in to view your profile</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 border-r p-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">👤</span>
              </div>
              
              <h2 className="text-xl font-bold mb-1">{user.name} {user.surname}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              <div className="flex justify-center space-x-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 mb-2">Account Management</h3>
              <button
                className="w-full text-left text-red-600 hover:text-red-700 mt-2"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-6">Edit Profile</h2>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {success}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      First Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                      Last Name
                    </label>
                    <input
                      id="surname"
                      name="surname"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.surname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Current Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Required to change your password
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      type="password"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.confirmNewPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-6">Account Information</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 text-gray-600">First Name</td>
                        <td className="py-2">{user.name}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Last Name</td>
                        <td className="py-2">{user.surname}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Email</td>
                        <td className="py-2">{user.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Quiz Results</h3>
                  
                  {user.quizResults?.interests ? (
                    <div className="mb-4 p-4 bg-blue-50 rounded">
                      <h4 className="font-semibold text-blue-800 mb-2">Interests</h4>
                      <p className="text-gray-700 mb-1"><strong>Area:</strong> {user.quizResults.interests.area}</p>
                      <p className="text-gray-700"><strong>Description:</strong> {user.quizResults.interests.description}</p>
                    </div>
                  ) : (
                    <div className="mb-4 p-4 bg-gray-50 rounded">
                      <p className="text-gray-500">No interest quiz results yet</p>
                    </div>
                  )}
                  
                  {user.quizResults?.bachelors ? (
                    <div className="mb-4 p-4 bg-green-50 rounded">
                      <h4 className="font-semibold text-green-800 mb-2">Bachelor's Program</h4>
                      <p className="text-gray-700">
                        {user.quizResults.bachelors?.selectedProgram?.name || "Bachelor's Program Selected"}
                    </p>
                    </div>
                  ) : (
                    <div className="mb-4 p-4 bg-gray-50 rounded">
                      <p className="text-gray-500">No bachelor's quiz results yet</p>
                    </div>
                  )}
                  
                  {user.quizResults?.university ? (
                    <div className="p-4 bg-purple-50 rounded">
                      <h4 className="font-semibold text-purple-800 mb-2">University Preferences</h4>
                      <p className="text-gray-700">
                    {user.quizResults.university?.universities?.length 
                        ? `${user.quizResults.university.universities[0].university} - ${user.quizResults.university.universities[0].degree}`
                        : "University Selected"}
                    </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded">
                      <p className="text-gray-500">No university quiz results yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;