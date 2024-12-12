import React, { useEffect, useState } from 'react';

const CareerAdvisorDB = ({interests,education,analysis}) => {

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    useEffect(()=>{
        const generatePrompt = (interests, education,analysis) => {
            return `Based on the following information, suggest 5 suitable career paths:
            Interests: ${interests}
            Education: ${education}
            TestResults Analysis: ${JSON.stringify(analysis)}
            Please provide specific career recommendations with brief explanations.`;
          };
        console.log("Got the prompt ",generatePrompt);
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
                  prompt: generatePrompt(interests, education,analysis),
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
          getRecommendations();
    },[])
  


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Career Recommendation Tool
          </h2>

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