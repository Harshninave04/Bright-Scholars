import React, { useState } from 'react';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'; // Lock and Mail icons
import { Link } from 'react-router-dom';
import InputField from '../components/FormComponents/InputField';
import { useGlobalContext } from '../contexts/GlobalContext';

const Login = () => {
  const { login, isLoading } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-full my-8 w-full">
      <div className="bg-base-200 shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email */}
          <InputField
            name="Email"
            type="email"
            onChange={handleEmailChange}
            value={email}
            placeholder="Email"
            icon={AiOutlineMail}
            isRequired={true}
          />

          {/* Password */}
          <InputField
            name="Password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Password"
            icon={AiOutlineLock}
            isRequired={true}
          />

          {/* Forgot Password Link */}
          <div className="text-right mt-2">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="mt-6">
            <button
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
              onClick={handleSubmit}
              disabled={isLoading}>
              {!isLoading ? 'Login' : <span className="loading loading-spinner"></span>}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
