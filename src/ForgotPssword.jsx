import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post('http://localhost:5000/api/users/forgot-password', formData);
        setServerMessage(res.data.message);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          setServerMessage(error.response.data.message);
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
      style={{ backgroundColor: 'rgb(12, 12, 16)' }}
    >
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-12 pt-8 pb-10 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        {serverMessage && <p className="text-green-500 text-sm italic mb-4">{serverMessage}</p>}
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
        <button
          className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          type="submit"
        >
          Send Reset Link
        </button>
        <p className="text-green text-center mt-2">
          Remembered your password?{' '}
          <a href='http://localhost:5173/login' className='text-green font-bold'>Login</a>
        </p>
      </form>
    </motion.div>
  );
};

export default ForgotPassword;
