import React, { useState } from 'react';
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
} from 'react-icons/ai'; // Mail, Lock, User, Phone, and Home icons

import UploadProfile from '../components/FormComponents/UploadProfile';
import InputField from '../components/FormComponents/InputField';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';

const SignUp = () => {
  const { signup, isLoading } = useGlobalContext();
  const [role, setRole] = useState('Kabadiwala');
  const [profilePic, setProfilePic] = useState(null);
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    profileImage: null,
  });

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Preview the image
      setSignUpData({ ...signUpData, profileImage: file }); // Store the file object
    } else {
      setProfilePic(null);
      setSignUpData({ ...signUpData, profileImage: null });
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form fields to FormData
    formData.append('name', signUpData.name);
    formData.append('email', signUpData.email);
    formData.append('role', signUpData.role);
    formData.append('password', signUpData.password);
    formData.append('confirmPassword', signUpData.confirmPassword);

    // Handle profile image
    if (signUpData.profileImage) {
      formData.append('profileImage', signUpData.profileImage);
    }

    try {
      await signup(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full my-8">
      <div className="bg-base-200 shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Register now!</h1>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Profile Picture Selector */}
          <UploadProfile profilePic={profilePic} handleProfilePicChange={handleProfilePicChange} />

          {/* Role Toggle button */}
          {/* <RoleToggle handleRoleToggle={handleRoleToggle} role={role} /> */}

          {/* Name */}
          <InputField
            name="name"
            type="text"
            value={signUpData.name}
            onChange={onInputChange}
            placeholder="Name"
            icon={AiOutlineUser}
            isRequired={true}
          />

          {/* Email */}
          <InputField
            name="email"
            type="email"
            value={signUpData.email}
            onChange={onInputChange}
            placeholder="Email"
            icon={AiOutlineMail}
            isRequired={true}
          />

          {/* Password */}
          <InputField
            name="password"
            type="password"
            value={signUpData.password}
            onChange={onInputChange}
            placeholder="Password"
            icon={AiOutlineLock}
            isRequired={true}
          />

          {/* Confirm Password */}
          <InputField
            name="confirmPassword"
            type="password"
            value={signUpData.confirmPassword}
            onChange={onInputChange}
            placeholder="Confirm Password"
            icon={AiOutlineLock}
            isRequired={true}
          />

          {/* Sign Up Button */}
          <div className="mt-6">
            <button
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
              type="submit"
              disabled={isLoading}>
              {!isLoading ? 'Sign Up' : <span className="loading loading-spinner"></span>}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
