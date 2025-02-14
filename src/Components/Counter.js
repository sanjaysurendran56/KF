// src/components/Counter.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { addTask, deleteTask } from '../redux/CounterSlie';
import { useNavigate } from 'react-router-dom';

const Counter = () => {
  const Navigationed=useNavigate();
  const sample=()=>{
    Navigationed('/reducx')
  }
  const [task, setTask] = useState('');
 
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };
  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    }
  };

  const handleDeleteTask = (event) => {
    event.target.parentElement.remove();
  };

  return (
    <center>
      <div className="tore">
        <h1>Todo List</h1>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Task Input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Enter your task!"
            onChange={handleInputChange}
            value={task}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleAddTask}>Add</Button>

        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map((task, index) => (
              <li key={index}>
                {task} <Button variant="danger" onClick={(event) => handleDeleteTask(event)}>Delete</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    <Button variant='primary' onClick={()=>sample()}>Click</Button>
    </center>
  );
};

export default Counter;
