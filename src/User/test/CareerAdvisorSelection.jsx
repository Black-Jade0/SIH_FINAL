import React, { useState, useEffect } from 'react';
import CareerAdvisorDB from './CareerRecommendation2';
import CareerAdvisor from '../CareerRecommendation';
import { BASE_URL } from '../../../config';


const CareerAdvisorSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only fetch user data if database method is selected
    if (selectedMethod === 'database') {
      fetchUserData();
    }
  }, [selectedMethod]);

  const fetchUserData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(BASE_URL+'/user/fetchaccountdetails', {
        credentials: 'include'  // If you're using cookies for auth
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      
      // Check if required fields exist
      if (!data.interests || !data.skills || !data.education) {
        throw new Error('Profile incomplete. Please fill in your interests, skills, and education first.');
      }

      setUserData(data);
    } catch (err) {
      setError(err.message);
      setSelectedMethod('');  // Reset selection on error
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => setError('')}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Try Again
          </button>
        </div>
      );
    }

    switch (selectedMethod) {
      case 'manual':
        return <CareerAdvisor />;
      case 'database':
        return userData && <CareerAdvisorDB 
          interests={userData.fieldofinterest}
          analysis={userData.analysis}
          education={userData.stemresponse}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Career Recommendation System
          </h1>

          {/* Method Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Choose how you want to provide your information:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedMethod('database')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedMethod === 'database'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="text-lg font-medium mb-2">Use My Profile Data</h3>
                <p className="text-gray-600 text-sm">
                  Get recommendations based on your existing profile information
                </p>
              </button>

              <button
                onClick={() => setSelectedMethod('manual')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedMethod === 'manual'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="text-lg font-medium mb-2">Enter Information Manually</h3>
                <p className="text-gray-600 text-sm">
                  Provide custom information for this recommendation
                </p>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="mt-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAdvisorSelector;