import React from 'react';
import myImage from "../assets/pexels-olly-3762803.jpg"
// import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Retrieve user data from local storage
  // const user = JSON.parse(localStorage.getItem('user'));

  // Handle case where user data might not be available
  // if (!user) {
  //   return <div>Please log in to view this page.</div>;
  // }

  return (
    // <div>
    //   <h1>Welcome, {user.name}!</h1>
    //   <img src={user?.profileImage} alt="profile image" />
    //   <p>Role: {user.role}</p>
    // </div>
    <div className="flex justify-center items-stretch gap-4 w-full p-4">
      {/* Hero Banner */}
      <div
        className="relative w-full md:w-2/4 h-auto flex-grow bg-center bg-cover flex items-center justify-center text-center text-white overflow-hidden rounded-md"
        style={{ backgroundImage: `url(${myImage})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 px-6 py-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Scholar</h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6">
            Discover scholarships opportunites which tailored to your needs and eligibility!
          </p>
          <a href="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Get Started
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
