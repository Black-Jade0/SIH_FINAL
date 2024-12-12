import React, { useState, useRef, useEffect } from "react";
import TextAnswerQuestion from "./TextAnswerQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import axios from "axios";
import { BASE_URL } from "../../../../config";
import Result from "./Result";
import { useLocation } from "react-router-dom";

const PWDquestionpaper = () => {
    const location = useLocation();
    const { data, subject, level } = location.state;
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState();

    // Create refs for each question
    const questionRefs = useRef([]);

    // Method to scroll to a specific question
    const scrollToQuestion = (index) => {
        if (questionRefs.current[index]) {
            questionRefs.current[index].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const submitAnswer = async () => {
        try {
            const response = await axios.post(
                BASE_URL + "/user/submitanswer",
                {
                    answers: answers,
                    subject: subject,
                    level: level,
                },
                {
                    withCredentials: true,
                }
            );
            setResult(response.data.evaluatedresponse);
        } catch (error) {
            console.log("Got the following error: ", error);
        }
    };

    if (result) {
        return <Result data={result} />;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 text-black">
            {/* Passages Section */}
            {data.passages &&
                data.passages.map((passage) => (
                    <div
                        key={passage.id}
                        className="mb-8 bg-white rounded-lg shadow-md"
                    >
                        <div className="p-4 border-b">
                            {passage.title && (
                                <h2 className="text-xl font-bold">
                                    {passage.title}
                                </h2>
                            )}
                            {passage.source && (
                                <div className="text-sm text-gray-500">
                                    Source: {passage.source}
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <p className="whitespace-pre-wrap">
                                {passage.text}
                            </p>
                        </div>
                    </div>
                ))}

            {/* Questions Section */}
            <div className="space-y-6">
                {data.questions.map((question, index) => (
                    <div
                        key={question.id}
                        ref={(el) => (questionRefs.current[index] = el)}
                        className="mb-6"
                    >
                        {question.passageRef && (
                            <div className="text-sm text-gray-500 mb-2">
                                Reference: Passage {question.passageRef}
                            </div>
                        )}
                        {question.options ? (
                            <MultipleChoiceQuestion
                                question={question}
                                onAnswerChange={handleAnswerChange}
                            />
                        ) : (
                            <TextAnswerQuestion
                                question={question}
                                onAnswerChange={handleAnswerChange}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex space-x-4 mt-4">
                <button
                    className="bg-blue-400 px-4 py-2 rounded"
                    onClick={submitAnswer}
                >
                    Submit
                </button>
                {/* Example of scrolling to a specific question */}
                <button
                    className="bg-green-400 px-4 py-2 rounded"
                    onClick={() => scrollToQuestion(2)} // Scroll to 3rd question (0-indexed)
                >
                    Go to Question 3
                </button>
            </div>
        </div>
    );
};

export default PWDquestionpaper;
