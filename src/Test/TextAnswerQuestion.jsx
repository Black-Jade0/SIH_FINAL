
// Component for text-based answer questions
const TextAnswerQuestion = ({ question, onAnswerChange }) => {
    return (
      <div className="mb-6 bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <span className="font-bold">{question.id}.</span>
            <span className="text-black">{question.text}</span>
          </div>
          {question.marks && (
            <div className="text-sm text-gray-500 ">Marks: {question.marks}</div>
          )}
        </div>
        <div className="p-4">
          <textarea
            className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your answer here..."
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
          />
        </div>
      </div>
    );
  };
  
export default TextAnswerQuestion;  