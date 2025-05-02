import { useState } from 'react';
import QuizQuestion from '../components/QuizQuestion';

export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const startQuiz = async () => {
    try {
      const res = await fetch('http://localhost:5000/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      // Convert correctOption (text) to correctAnswer (index)
      const processedQuestions = data.questions.map((q) => ({
        ...q,
        correctAnswer: q.options.indexOf(q.correctOption),
      }));

      setQuestions(processedQuestions);
      setUserAnswers(Array(processedQuestions.length).fill(null));
      setSubmitted(false);
    } catch (err) {
      console.error('Failed to fetch quiz:', err);
    }
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
