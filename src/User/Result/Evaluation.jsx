import React from 'react'
import { useLocation } from 'react-router-dom';

const EvaluationResults = () => {
  const location = useLocation();
    const { data } = location.state;
  const getStatusColor = (awarded) => {
    switch (awarded.toLowerCase()) {
      case 'full':
        return 'text-green-600';
      case 'partial':
        return 'text-yellow-600';
      case 'none':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  if(!data){
    return <>
    Loading 
    </>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Overall Score Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Evaluation Results</h1>
        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Total Marks</p>
            <p className="text-4xl font-bold text-gray-800">{data.TotalMarks}</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-600">Obtained Marks</p>
            <p className="text-4xl font-bold text-gray-800">{data.ObtainedMarks}</p>
          </div>
        </div>
      </div>

      {/* Questions Overview */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions Overview</h2>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-gray-600">Total Questions</p>
            <p className="text-2xl font-bold text-gray-800">{data.evaluation.totalQuestions}</p>
          </div>
          <div>
            <p className="text-gray-600">Questions Answered</p>
            <p className="text-2xl font-bold text-gray-800">{data.evaluation.questionsAnswered}</p>
          </div>
        </div>
      </div>

      {/* Detailed Questions Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Analysis</h2>
        <div className="space-y-4">
          {Object.entries(data.evaluation.detailedMarks).map(([questionKey, details]) => (
            <div key={questionKey} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">
                  Question {questionKey.replace('question', '')}
                </h3>
                <span className={`font-medium ${getStatusColor(details.awarded)}`}>
                  {details.awarded.charAt(0).toUpperCase() + details.awarded.slice(1)} Marks
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Correct Answer:</p>
                  <p className="text-gray-800 font-medium">{details['right answer']}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Your Answer:</p>
                  <p className="text-gray-800 font-medium">{details['obtained answer']}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationResults;



