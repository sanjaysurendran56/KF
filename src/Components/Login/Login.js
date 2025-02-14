
import React, { useState } from 'react';
import './Login.css';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate} from 'react-router-dom'; 
import { RiTodoLine } from "react-icons/ri";
import { Consumer } from './Context';
const dataArray = JSON.parse(localStorage.getItem("mydata"));
const namepass = dataArray.map(index => ({
    username: index.name,
    password: index.password
}));

const Login = () => {
    const Navigate=useNavigate();
    const clicktodo = () => {
        //  console.log(data.name) //knackforge
        //  console.log(typeof data.name)
        //  console.log(namepass[0].username) //Sanjay@0506
        //  console.log(typeof namepass[0].username)

         if(data.name == (namepass[0].username) && data.pass== (namepass[0].password)){
            
             Navigate('/todo');
        }
       };
   
    const [data, setData] = useState({
        name: '',
        pass: '',
    });
    const handle = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };
    const validatePassword = (password) => {
        const specialchar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return specialchar.test(password);
    };
    const errormessage = () => {
        if (!data.name && !data.pass) {
            return <span style={{ color: 'red' }}>Username and Password are required</span>;
        } else if (!data.name) {
            return <span style={{ color: 'red' }}>Username is required</span>;
        } else if (!data.pass) {
            return <span style={{ color: 'red' }}>Password is required</span>;
        } else if (data.pass.length < 8) {
            return <span style={{ color: 'red' }}>Password must be at least 8 characters</span>;
        } else if (!validatePassword(data.pass)) {
            return (
                <span style={{ color: 'red' }}>
                    Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
                </span>
            );
        }
         else if(data.name != (namepass[0].username) || data.pass!= (namepass[0].password)){
             return (
                 <span style={{ color: 'red' }}>
                     Incorrect Password or username
                 </span>
             );
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    

    const [a, b] = useState(false);

    return (
        <div>
        <div className='navbar'>
        <h1>  <RiTodoLine />Todo
                    </h1>
                    <Consumer>
                        {(value)=>(
                            <div>
                                {value.butt()}
                                </div>                       
                            )}
                    </Consumer>
              </div>
              <br></br>
            <h1 className='one'>Please log in for more!</h1>
            <div className='two'>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">User Name</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        required
                        type='text'
                        name="name"
                        onChange={handle}
                        value={data.name}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Password</InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        required
                        type={showPassword ? 'text' : 'password'}
                        name="pass"
                        onChange={handle}
                        value={data.pass}
                    />
                    <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                        {showPassword ?  <FaEye /> : <FaEyeSlash />}
                    </Button>
                </InputGroup>
                <Link to='/newreg'>New Registration?</Link>
                {a ? errormessage() : <></>}<br></br>
                <button type='submit' className="btn btn-primary px-10 py-10" onClick={() => {b(true);clicktodo()}}>Login</button>   
            </div>
        </div>
    );
};

export default Login;