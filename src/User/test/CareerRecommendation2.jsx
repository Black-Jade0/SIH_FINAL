import React, { useState } from 'react';

const CareerAdvisorDB = () => {
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePrompt = (interests, skills, education) => {
    return `Based on the following information, suggest 5 suitable career paths:
    Interests: ${interests}
    Skills: ${skills}
    Education: ${education}
    
    Please provide specific career recommendations with brief explanations.`;
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer IA9vNMfHYZhBHoD3GJiqCz3BmeJWZzDgWT8AcuxR', // Replace with your API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command',
          prompt: generatePrompt(interests, skills, education),
          max_tokens: 500,
          temperature: 0.7,
          k: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE'
        })
      });

      const data = await response.json();
      if (data.generations && data.generations[0]) {
        // Split the response into separate recommendations
        const recommendationsList = data.generations[0].text
          .split('\n')
          .filter(item => item.trim().length > 0);
        setRecommendations(recommendationsList);
      }
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecommendations();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Career Recommendation Tool
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                What are your interests?
              </label>
              <textarea
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="E.g., problem-solving, working with people, creative design..."
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                What are your skills?
              </label>
              <textarea
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="E.g., programming, communication, project management..."
              />
            </div>

            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                What is your educational background?
              </label>
              <textarea
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="E.g., Bachelor's in Computer Science, currently pursuing MBA..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Getting Recommendations...' : 'Get Career Recommendations'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recommended Career Paths
              </h3>
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-md"
                  >
                    <p className="text-gray-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerAdvisorDB;