// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ParticlesBg from './particles';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    profilePicture: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!formData.name) errors.name = 'Name is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post('http://localhost:5000/api/users/signup', formData);
        console.log(res.data);
        window.location.href = '/login';
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // style={{ backgroundColor: 'rgb(12, 12, 16)' }} 
      className="flex items-center justify-center min-h-screen"
    >
     
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-12 pt-8 pb-10 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        {errors.message && <p className="text-red-500 text-sm italic mb-4">{errors.message}</p>}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500`}
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500`}
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-xs italic mt-2">{errors.username}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500`}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500`}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500`}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-2">{errors.confirmPassword}</p>}
        </div>
       
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="profilePicture">
            Profile Picture
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.profilePicture ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500`}
            id="profilePicture"
            type="text"
            name="profilePicture"
            placeholder="Profile Picture URL"
            value={formData.profilePicture}
            onChange={handleChange}
          />
          {errors.profilePicture && <p className="text-red-500 text-xs italic mt-2">{errors.profilePicture}</p>}
        </div>
        <button
          className="w-full bg-purple-600 hover:bg-purple-800 text-pink font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          type="submit"
        >
          Sign Up
        </button>
        <p className="text-green text-center mt-2">
  Already have an account?{' '}
  <a href='http://localhost:5173/login' className='text-green font-bold'>Log In</a>
</p>
</form>
    </motion.div>
  );
};

export default Signup;
