import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Use react-router-dom's useNavigate to programmatically redirect

  const handleLogout = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // Make a POST request to the /logout endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true, // Ensure cookies (e.g., session cookie) are sent
        }
      );

      if (response.status === 200) {
        // Successfully logged out
        console.log(response.data);
        // Redirect to the login page or homepage
        navigate('/login');
      } else {
        // If the response is not successful
        setErrorMessage('Failed to log out. Please try again.');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Logout failed:', error);
      setErrorMessage('An error occurred while logging out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="flex flex-col items-center justify-center h-screen">
    //   <h2 className="text-xl mb-4">Are you sure you want to log out?</h2>

    //   {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

    <button
      onClick={handleLogout}
      disabled={loading}
      className={`bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
    >
      {loading ? 'Logging out...' : 'Log Out'}
    </button>
    // </div>
  );
};

export default Logout;
