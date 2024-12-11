import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [status, setStatus] = useState('Click "Start Recording" to begin');
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onstart = () => {
        setStatus('Listening...');
      };

      recognitionInstance.onend = () => {
        setStatus('Click "Start Recording" to begin');
        setIsRecording(false);
      };

      recognitionInstance.onresult = (event) => {
        let finalTranscriptTemp = '';
        let interimTranscriptTemp = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscriptTemp += transcript;
          } else {
            interimTranscriptTemp += transcript;
          }
        }

        setFinalTranscript(prevTranscript => prevTranscript + finalTranscriptTemp);
        setInterimTranscript(interimTranscriptTemp);
      };

      recognitionInstance.onerror = (event) => {
        setStatus(`Error occurred: ${event.error}`);
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    }

    // Cleanup function
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (!isRecording) {
      recognition.start();
      setIsRecording(true);
    } else {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Speech to Text Converter</h1>
        
        <button
          onClick={toggleRecording}
          disabled={!isSupported}
          className={`px-6 py-3 text-lg rounded-md ${
            isSupported 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>

        <p className="mt-4 text-gray-600 italic">{status}</p>

        <div className="mt-6 text-left">
          <div className="mb-4">
            <h2 className="font-bold mb-2">Final Transcript:</h2>
            <div className="p-4 border rounded-md min-h-24 bg-white text-black">
              {finalTranscript}
            </div>
          </div>

          <div>
            <h2 className="font-bold mb-2">Interim Transcript:</h2>
            <div className="p-4 border rounded-md min-h-24 bg-gray-50">
              {interimTranscript}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;