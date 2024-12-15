import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

const TextAnswerQuestion = ({ question, onAnswerChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState('');

  const toggleListening = () => {
    if (!isListening) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
  };

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false; // Changed to false to prevent multiple results
      recognition.interimResults = false; // Changed to false to only get final results
      
      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        if (event.results[0].isFinal) {
          const transcript = event.results[0][0].transcript;
          setAnswer(prevAnswer => {
            const newAnswer = (prevAnswer + ' ' + transcript).trim();
            onAnswerChange(question.id, newAnswer);
            return newAnswer;
          });
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Automatically restart listening if the button is still active
        if (isListening) {
          recognition.start();
        }
      };

      recognition.lang = 'en-IN'; // Set to Indian English
      recognition.start();
      window.recognition = recognition;
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const stopSpeechRecognition = () => {
    if (window.recognition) {
      window.recognition.stop();
    }
    setIsListening(false);
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <div className="flex gap-2">
          <span className="font-bold">{question.id}.</span>
          <span className="text-black">{question.text}</span>
        </div>
        {question.marks && (
          <div className="text-sm text-gray-500">Marks: {question.marks}</div>
        )}
      </div>
      <div className="p-4 relative">
        <textarea
          className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black pr-12"
          placeholder="Enter your answer here..."
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            onAnswerChange(question.id, e.target.value);
          }}
        />
        <button
          onClick={toggleListening}
          className={`absolute right-6 bottom-6 p-2 rounded-full transition-colors ${
            isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
          }`}
          title={isListening ? 'Stop recording' : 'Start recording'}
        >
          {isListening ? (
            <MicOff className="w-5 h-5 text-white" />
          ) : (
            <Mic className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TextAnswerQuestion;