// pages/QuizPage.js
import { useState } from 'react';
import QuizQuestion from '../components/QuizQuestion';
import { jwtDecode } from 'jwt-decode';
import './QuizPage.css'; // 👈 Make sure this CSS file exists

export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!topic) {
        alert('Please enter a topic');
        return;
      }

      const res = await fetch('https://smartedbackend.onrender.com/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (!data.questions) throw new Error(data.message || 'Failed to generate quiz');

      const processedQuestions = data.questions.map((q) => ({
        ...q,
        correctAnswer: q.options.indexOf(q.correctOption),
      }));

      setQuestions(processedQuestions);
      setUserAnswers(Array(processedQuestions.length).fill(null));
      setSubmitted(false);
      setScore(0);
    } catch (err) {
      console.error('Failed to fetch quiz:', err);
      alert('Unable to fetch quiz, possibly due to an invalid token or no topic.');
    }
  };

  const handleAnswer = (qIndex, optionIndex) => {
    const updated = [...userAnswers];
    updated[qIndex] = optionIndex;
    setUserAnswers(updated);
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    const calculatedScore = userAnswers.reduce(
      (acc, ans, i) => (ans === questions[i].correctAnswer ? acc + 1 : acc),
      0
    );

    setScore(calculatedScore);

    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);

      const { username, email } = decoded;

      const res = await fetch('https://smartedbackend.onrender.com/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          subject: topic,
          marks: calculatedScore,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      console.log('Quiz submitted:', result.message);
      alert('Quiz submitted successfully');
    } catch (err) {
      console.error('Error submitting quiz:', err);
      alert('Failed to submit quiz');
    }
  };

  return (
    <div className="quiz-page-wrapper">
      <div className="container quiz-content">
        <h2 className="mb-4">Smart Quiz</h2>

        {questions.length > 0 ? (
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
              <div className="text-center mt-4 mb-5">
                <button onClick={handleSubmit} className="btn btn-success">
                  Submit
                </button>
              </div>
            ) : (
              <div className="alert alert-info mt-4 mb-5">
                Final Score: <strong>{score}</strong> / {questions.length}
              </div>
            )}
          </>
        ) : (
          <div className="text-muted mt-3">Enter a topic to start the quiz</div>
        )}
      </div>

      {/* Fixed input section */}
      {questions.length === 0 && (
        <div className="quiz-input-fixed">
          <div className="container">
            <div className="input-group">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic"
                className="form-control"
              />
              <button onClick={startQuiz} className="btn btn-primary">
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
