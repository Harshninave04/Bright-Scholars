import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
// import { useNavigate } from 'react-router-dom';

const Home = () => {

 const {user} = useGlobalContext();

  // Handle case where user data might not be available
  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Home;
