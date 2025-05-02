import { useState } from 'react';
import TodoItem from '../components/TodoItem';

export default function TodoPage() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setTask('');
  };

  const toggleTask = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">To-Do List</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-success" onClick={addTask}>Add</button>
      </div>

      <ul className="list-group">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
