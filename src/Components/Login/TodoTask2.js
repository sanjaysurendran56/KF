import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './TodoTask.css'
import taskData from '../TodoTask/Data.json'
import { useNavigate } from "react-router-dom";
import { Consumer } from "./Context";
const TodoApp = () => {
  const [todos, setTodos] = useState(taskData.tasks);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const Navigations=useNavigate();
  const homepage=()=>{
    Navigations('/')
  }
  const addTodo = () => {
    if(newTodo){
      const newObj =  { name: newTodo, id:15, Status: 'A' }
      setTodos([...todos,newObj]);
      setNewTodo("");
    }
      else{
        alert("Please Enter The Message")
      }
    
  };
  const Deleteitem=(obj)=>{
    setTodos(
      todos.filter((todo) =>
        todo.id !== obj.id 
      )
    );
  }

  // Start editing a todo
  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    console.log('edit obj : ' , todo)
    setNewTodo(todo.name);
  };

  // Update the current todo
  const updateTodo = () => {
    console.log('new value', newTodo)
  
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, name: newTodo  } : todo
      )
    );
    setNewTodo("");
    setIsEditing(false);
    setCurrentTodo(null);
  };

  return (
    
    <div className="one">
       <Consumer className="theme">
                         {(value)=>(
                             <div>
                                 {value.butt()}
                                 </div>                       
                             )}
                     </Consumer>
       <Button variant="primary" className="logout" onClick={homepage}>logout</Button>
      
      <h1 className="title">To-do List</h1>
      <div className="input-section">
        <InputGroup size="lg" className='p-5'>
        <InputGroup.Text id="inputGroup-sizing-lg">Employee Status</InputGroup.Text>
        <Form.Control
          aria-describedby="inputGroup-sizing-sm" placeholder='Employee name' onChange={(e)=>setNewTodo(e.target.value)} value={newTodo}/>
      </InputGroup>
        {!isEditing ? (
        <Button type='text' variant="primary" size="lg" className='m-2' onClick={()=>addTodo()}>
          +Add
        </Button>
        ) : (
          <Button type='text' variant="primary" size="lg" className='m-2' onClick={()=>updateTodo()}>
          Update Todo
        </Button>
        )}
      </div>

      <table>
        <tr>
        <th>Id</th>
        <th>Employee Name</th>
        <th>Status A/I</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        {todos.map((obj)=>( 
           <tr> 
          <td>{obj.id}</td>
          <td>{obj.name}</td>
          <td>{obj.Status}</td>
          <td><Button type='text' variant="success" size="lg" onClick={()=>editTodo(obj)}>
          Edit
        </Button></td>
        <td><Button type='text' variant="danger" size="lg"onClick={()=>Deleteitem(obj)}>
          Delete</Button></td>
        </tr>
      ))
      }
        
    </table>
      </div>
  )
};

export default TodoApp;
