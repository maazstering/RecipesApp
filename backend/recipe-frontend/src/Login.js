import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            console.log('Login Success:', response.data);
            console.log("Role: ", response.data.role)
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('token',response.data.token)  
            navigate('/recipes'); 
        } catch (error) {
            console.error('Login Error:', error.response.data);
        }
    };
    

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>

        
        </div>
    );
}

export default Login;
