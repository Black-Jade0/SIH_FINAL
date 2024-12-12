import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

const MultipleChoiceQuestion = ({ question, onAnswerChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isListening, setIsListening] = useState(false);

    // Comprehensive option mapping
    const OPTION_MAPPINGS = {
        'one': question.options[0]?.id,
        'two': question.options[1]?.id,
        'three': question.options[2]?.id,
        'four': question.options[3]?.id,
        'a': question.options[0]?.id,
        'b': question.options[1]?.id,
        'c': question.options[2]?.id,
        'd': question.options[3]?.id,
        'first': question.options[0]?.id,
        'second': question.options[1]?.id,
        'third': question.options[2]?.id,
        'fourth': question.options[3]?.id
    };

    useEffect(() => {
        // Check browser compatibility
        const SpeechRecognition = 
            window.SpeechRecognition || 
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error('Speech recognition not supported');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            console.log('Recognized speech:', transcript);

            // Find the matching option
            const matchedOptionId = OPTION_MAPPINGS[transcript];

            if (matchedOptionId) {
                console.log('Matched Option ID:', matchedOptionId);
                
                // Directly update the state and trigger onAnswerChange
                setSelectedOption(matchedOptionId);
                onAnswerChange(question.id, matchedOptionId);
            }
        };

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        // Store recognition instance globally
        window.currentRecognition = recognition;

        // Cleanup
        return () => {
            if (window.currentRecognition) {
                window.currentRecognition.stop();
            }
        };
    }, [question, onAnswerChange]);

    const handleManualSelect = (optionId) => {
        setSelectedOption(optionId);
        onAnswerChange(question.id, optionId);
    };

    const toggleListening = () => {
        if (!window.currentRecognition) {
            console.error('Speech recognition not supported');
            return;
        }

        if (isListening) {
            window.currentRecognition.stop();
        } else {
            try {
                window.currentRecognition.start();
            } catch (error) {
                console.error('Failed to start speech recognition', error);
            }
        }
    };

    return (
        <div className="mb-6 bg-white rounded-lg shadow-md">
            <div className="p-4 border-b flex justify-between items-center">
                <div className="flex gap-2">
                    <span className="font-bold">{question.id}.</span>
                    <span className="text-black">{question.text}</span>
                </div>
                <button 
                    onClick={toggleListening}
                    className={`p-2 rounded-full ${isListening ? 'bg-red-100' : 'bg-blue-100'}`}
                >
                    {isListening ? <MicOff color="red" /> : <Mic color="blue" />}
                </button>
            </div>

            <div className="p-4">
                <div className="space-y-3">
                    {question.options.map((option) => (
                        <label
                            key={option.id}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option.id}
                                checked={selectedOption === option.id}
                                onChange={() => handleManualSelect(option.id)}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-black">{option.text}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultipleChoiceQuestion;