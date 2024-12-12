import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/user/api',
  timeout: 8000,
});

const TriviaGame = () => {
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [settings, setSettings] = useState({
    difficulty: 'medium',
    category: '',
    questionCount: 5
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      setError('Failed to fetch categories. Please try again.');
      console.error('Categories error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestion = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setAnswerSubmitted(false);
      setLastAnswerCorrect(null);

      const response = await api.get('/questions', {
        params: {
          amount: 1,
          difficulty: settings.difficulty,
          category: settings.category || undefined
        }
      });
      
      if (response.data && response.data.length > 0) {
        const question = response.data[0];
        const answers = [...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - 0.5);
        setCurrentQuestion({ ...question, answers });
      } else {
        setError('No questions available. Try different settings.');
      }
    } catch (error) {
      setError('Failed to fetch question. Please try again.');
      console.error('Question fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [settings]);

  const handleAnswer = async (answer) => {
    if (answerSubmitted) return;
    
    try {
      setLoading(true);
      const response = await api.post('/validate-answer', {
        userAnswer: answer,
        correctAnswer: currentQuestion.correct_answer
      });

      setAnswerSubmitted(true);
      setLastAnswerCorrect(response.data.correct);
      
      if (response.data.correct) {
        setScore(prev => prev + 1);
      }

      // Wait 1.5 seconds before moving to next question
      setTimeout(async () => {
        setTotalQuestions(prev => prev + 1);
        if (totalQuestions + 1 < settings.questionCount) {
          await fetchQuestion();
        } else {
          // Game Over logic
          setGameStarted(false);
        }
      }, 1500);

    } catch (error) {
      setError('Failed to validate answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startGame = async () => {
    setGameStarted(true);
    setScore(0);
    setTotalQuestions(0);
    setError(null);
    await fetchQuestion();
  };

  const getButtonColor = (answer) => {
    if (!answerSubmitted) return 'bg-white hover:bg-gray-50';
    
    if (answer === currentQuestion.correct_answer) {
      return 'bg-green-100 border-green-500';
    }
    
    return 'bg-red-100 border-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6">
          <h1 className="text-2xl font-bold text-center text-white">Trivia Game</h1>
          {gameStarted && (
            <div className="mt-2 text-center text-white">
              Question {totalQuestions + 1} of {settings.questionCount}
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {!gameStarted ? (
            <div className="space-y-6">
              {/* Game Over Status */}
              {totalQuestions > 0 && (
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <h2 className="text-xl font-bold text-indigo-800">Game Over!</h2>
                  <p className="text-indigo-600">
                    Final Score: {score} out of {totalQuestions}
                    {' '}({Math.round((score/totalQuestions) * 100)}%)
                  </p>
                </div>
              )}

              {/* Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions:
                </label>
                <select 
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={settings.questionCount}
                  onChange={(e) => setSettings({...settings, questionCount: Number(e.target.value)})}
                >
                  {[5, 10, 15, 20].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty:
                </label>
                <select 
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={settings.difficulty}
                  onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category:
                </label>
                <select 
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={settings.category}
                  onChange={(e) => setSettings({...settings, category: e.target.value})}
                >
                  <option value="">Any Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={startGame}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Start Game'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-right font-medium text-indigo-600">
                Score: {score}/{totalQuestions}
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading next question...</p>
                </div>
              ) : currentQuestion ? (
                <div className="space-y-4">
                  <p className="text-lg text-gray-800" 
                     dangerouslySetInnerHTML={{ __html: currentQuestion.question }} 
                  />
                  <div className="space-y-2">
                    {currentQuestion.answers.map((answer, index) => (
                      <button
                        key={index}
                        className={`w-full text-black px-4 py-2 text-left border rounded-md transition-colors ${
                          getButtonColor(answer)
                        } ${loading || answerSubmitted ? 'cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        onClick={() => handleAnswer(answer)}
                        disabled={loading || answerSubmitted}
                        dangerouslySetInnerHTML={{ __html: answer }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {lastAnswerCorrect !== null && (
                <div className={`text-center p-2 rounded ${
                  lastAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {lastAnswerCorrect ? 'Correct!' : 'Incorrect!'}
                </div>
              )}

              <button 
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                onClick={() => setGameStarted(false)}
              >
                End Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TriviaGame;