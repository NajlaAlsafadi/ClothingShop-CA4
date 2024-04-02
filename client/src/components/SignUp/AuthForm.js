import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './AuthForm.css'; 

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const containerClass = `form-container ${isSignUp ? 'sign-up-active' : ''}`;

  return (
    <div className={containerClass}>
      {isSignUp ? (
        <SignUpForm onToggle={handleToggle} />
      ) : (
        <SignInForm onToggle={handleToggle} />
      )}
    </div>
  );
};

export default AuthForm;
