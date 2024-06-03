import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post('http://localhost:5000/api/users/login', formData);
        console.log(res.data);
        // Redirect to the homepage or dashboard after successful login
        window.location.href = '/posts';
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          setServerError(error.response.data.message);
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
      className="flex items-center justify-center min-h-screen"
      // style={{ backgroundColor: 'rgb(12, 12, 16)' }} 
    >

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-12 pt-8 pb-10 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {serverError && <p className="text-red-500 text-sm italic mb-4">{serverError}</p>}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
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
            } rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          type="submit"
        >
          Login
        </button>
        <p className="text-green text-center mt-2 mx-4">
   Create an account?{' '}
  <a href='http://localhost:5173/signup' className='text-green font-bold'>Sign Up</a>
  Forgot Password {' '}<a href='http://localhost:5173/forgot' className='text-green font-bold'>Resest</a>
</p>
      </form>
    </motion.div>
  );
};

export default Login;
