const MultipleChoiceQuestion = ({ question, onAnswerChange }) => {
    return (
        <div className="mb-6 bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
                <div className="flex gap-2">
                    <span className="font-bold">{question.id}.</span>
                    <span>{question.text}</span>
                </div>
                {question.marks && (
                    <div className="text-sm text-gray-500">
                        Marks: {question.marks}
                    </div>
                )}
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
                                onChange={() =>
                                    onAnswerChange(question.id, option.id)
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-900">{option.text}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultipleChoiceQuestion;
