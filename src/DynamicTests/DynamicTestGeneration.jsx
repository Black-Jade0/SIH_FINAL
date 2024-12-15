import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../../config';

const DifficultySelector = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [data, setData] = useState()

  const handleSubmit =async () => {
    if (topic.trim()) {
        const response = await axios.post(BASE_URL+'/user/dynamicquestion',{
            subject:topic,
            level:difficulty
        },{
            withCredentials:true
        });
        console.log("Got the questions !");
        setData(response.data.result);
        //store it in parsed question database 
        //render these questions with proper answer input boxes 
    }
  };

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'medium', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Generate a Question
        </h2>
        
        <div>
          <label 
            htmlFor="topic" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., Python programming, World History)"
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label 
            htmlFor="difficulty" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Difficulty Level
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {difficultyLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={!topic.trim()}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          Generate Question
        </button>
      </div>
    </div>
  );
};

export default DifficultySelector;