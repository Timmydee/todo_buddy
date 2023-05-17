import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, { text: newTodo, completed: false }];
      setTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const handleTodoCheck = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const allTodos = todos.map((todo, index) => (
    <div key={index}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleTodoCheck(index)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => handleDeleteTodo(index)}>Delete</button>
    </div>
  ));

  const activeTodos = todos
    .filter((todo) => !todo.completed)
    .map((todo, index) => (
      <div key={index}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleTodoCheck(index)}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
      </div>
    ));

  const completedTodos = todos
    .filter((todo) => todo.completed)
    .map((todo, index) => (
      <div key={index}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleTodoCheck(index)}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
      </div>
    ));

  return (
    <div>
      <h2>All</h2>
      <div>{allTodos}</div>
      <h2>Active</h2>
      <div>{activeTodos}</div>
      <h2>Completed</h2>
      <div>{completedTodos}</div>
      <h2>Add Todo</h2>
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
}

export default TodoApp;
