import { useState } from 'react';
import QuizQuestion from '../components/QuizQuestion';

const mockAIQuestions = (topic) => [
  {
    question: `What is ${topic}?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0
  },
  {
    question: `Why is ${topic} important?`,
    options: ["Reason 1", "Reason 2", "Reason 3", "Reason 4"],
    correctAnswer: 1
  }
];

export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const startQuiz = () => {
    const aiQuestions = mockAIQuestions(topic);
    setQuestions(aiQuestions);
    setUserAnswers(Array(aiQuestions.length).fill(null));
    setSubmitted(false);
  };

  const handleAnswer = (qIndex, optionIndex) => {
    const updated = [...userAnswers];
    updated[qIndex] = optionIndex;
    setUserAnswers(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = userAnswers.reduce(
    (acc, ans, i) => ans === questions[i].correctAnswer ? acc + 1 : acc, 0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Smart Quiz</h2>

      {!questions.length && (
        <div className="input-group mb-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic"
            className="form-control"
          />
          <button onClick={startQuiz} className="btn btn-primary">Start Quiz</button>
        </div>
      )}

      {questions.length > 0 && (
        <>
          {questions.map((q, i) => (
            <QuizQuestion
              key={i}
              index={i}
              question={q}
              selected={userAnswers[i]}
              onSelect={handleAnswer}
              submitted={submitted}
            />
          ))}
          {!submitted ? (
            <button onClick={handleSubmit} className="btn btn-success mt-3">Submit</button>
          ) : (
            <div className="alert alert-info mt-3">
              Final Score: <strong>{score}</strong> / {questions.length}
            </div>
          )}
        </>
      )}
    </div>
  );
}
