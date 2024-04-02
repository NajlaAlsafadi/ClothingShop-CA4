import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = ({ onToggle }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign in successful', data);
        navigate('/'); 
      } else {
        console.error('Sign in failed');
        setErrorMessage("User doesn't exist, try again.");
        
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p onClick={onToggle}>Don't have an account? Sign Up</p>
    </form>
  );
};



export default SignInForm;
