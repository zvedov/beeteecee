import { useState } from "react";

export default function Quiz({ moduleId, questions }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionIndex, selectedOption) => {
    setAnswers({ ...answers, [questionIndex]: selectedOption });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      {!showResults ? (
        <>
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              {q.options.map((option, i) => (
                <button
                  key={i}
                  className={`w-full p-2 mt-2 border ${
                    answers[index] === option
                      ? "bg-green-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  } rounded-md`}
                  onClick={() => handleAnswer(index, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full mt-4 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg"
          >
            Submit Quiz
          </button>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold">Your Score: {score} / {questions.length}</h3>
          <button
            onClick={() => setShowResults(false)}
            className="mt-4 p-3 bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
}
