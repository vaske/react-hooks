import React, { useState, useRef } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className='todo'
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
    >
      {todo.text}

      <div>
        <button className="button" onClick={() => completeTodo(index)}>Complete</button>
        <button className="button is-danger" onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo, inputEl }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        onChange={e => setValue(e.target.value)}
        ref={inputEl}
      />
      <small className='small-text'>
        (after typing name press enter to add new item)
      </small>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React Hooks',
      isCompleted: false
    },
    {
      text: 'Go to basketball',
      isCompleted: false
    },
    {
      text: 'Build really cool todo app',
      isCompleted: false
    }
  ]);

  const inputEl = useRef(null);

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className='app container'>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              TODO sample app
            </h1>
            <h2 className="subtitle">
              usage of react hooks
            </h2>
            <button className='button is-info' onClick={onButtonClick}>
              Add New
            </button>
          </div>
        </div>
      </section>
      <div className='container is-fluid'>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} inputEl={ inputEl } />
      </div>
    </div>
  );
}

export default App;
