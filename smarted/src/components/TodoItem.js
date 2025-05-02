export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
      <li
        className={`list-group-item d-flex justify-between align-items-center 
        ${todo.completed ? 'bg-success-subtle text-decoration-line-through text-muted' : ''}`}
      >
        <span className="flex-grow-1">{todo.text}</span>
        <div className="btn-group">
          <button
            className={`btn btn-sm ${todo.completed ? 'btn-secondary' : 'btn-success'}`}
            onClick={() => onToggle(todo.id)}
          >
            {todo.completed ? 'Undo' : 'Mark as Done'}
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </div>
      </li>
    );
  }
  