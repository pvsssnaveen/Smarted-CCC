export default function QuizQuestion({ question, index, selected, onSelect, submitted }) {
    return (
      <div className="mb-4 border p-3 rounded">
        <p><strong>{index + 1}. {question.question}</strong></p>
        {question.options.map((option, i) => {
          const isCorrect = submitted && i === question.correctAnswer;
          const isWrong = submitted && selected === i && i !== question.correctAnswer;
  
          const optionClass = submitted
            ? isCorrect
              ? 'border border-success rounded bg-success bg-opacity-25 p-2'
              : isWrong
              ? 'border border-danger rounded bg-danger bg-opacity-25 p-2'
              : 'p-2'
            : 'p-2';
  
          return (
            <div key={i} className={`form-check ${optionClass}`}>
              <input
                className="form-check-input"
                type="radio"
                name={`question-${index}`}
                id={`q${index}-option${i}`}
                checked={selected === i}
                disabled={submitted}
                onChange={() => onSelect(index, i)}
              />
              <label className="form-check-label" htmlFor={`q${index}-option${i}`}>
                {option}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
  