import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignUpForm = ({ onToggle }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    street: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateStep = (currentStep) => {
    let errors = {};
    if (currentStep === 1) {
      if (!formData.username.trim()) errors.username = 'Username is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      if (!formData.password) errors.password = 'Password is required';
    }
    if (currentStep === 2) {
      //regex for zip code validation 
      if (!/^[a-zA-Z0-9]{6,8}$/.test(formData.zipCode)) {
        errors.zipcode = 'Zip code must be 6-8 letters/numbers';
      }
    }
    if (currentStep === 3) {
      //validate cvv
      if (!/^\d{3}$/.test(formData.cvv)) {
        errors.cvv = 'CVV must be 3 digits';
      }
      //vlidate card number
      if (!/^\d{16}$/.test(formData.cardNumber)) {
        errors.cardNumber = 'Card number must be 16 digits';
      }
      //validate expiry date
      if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.expiryDate) || new Date('20' + formData.expiryDate.split('/')[1], formData.expiryDate.split('/')[0]) < new Date()) {
        errors.expiryDate = 'Expiry date must be in mm/yy format and not expired';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const titles = {
    1: 'Create Your Account',
    2: 'Shipping Address',
    3: 'Payment Information',
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateStep(step)) {
      try {
        const response = await fetch('/api/customers/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log('Sign Up was successful');
          navigate('/'); 
        } else {
          console.error('Sign Up failed');
          
        }
      } catch (error) {
        console.error('Network error:', error);
      
      }
    }
  };


  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      {/*display the title based on the current step  */}
      <h2>{titles[step]}</h2>
      {step === 1 && (
        <>
          <input
            type="text"
            name="username"
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange}
            required
          />
           {formErrors.username && <p className="error">{formErrors.username}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
           {formErrors.password && <p className="error">{formErrors.password}</p>}
          <button type="button" onClick={nextStep}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
            {formErrors.zipcode && <p className="error">{formErrors.zipcode}</p>}
          <button type="button" onClick={prevStep}>Back</button>
          <button type="button" onClick={nextStep}>Next</button>
        </>
      )}
      {step === 3 && (
        <>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
          {formErrors.cardNumber && <p className="error">{formErrors.cardNumber}</p>}
          {formErrors.expiryDate && <p className="error">{formErrors.expiryDate}</p>}
          {formErrors.cvv && <p className="error">{formErrors.cvv}</p>}
          <button type="button" onClick={prevStep}>Back</button>
          <button type="submit">Create Account</button>
        </>
      )}
      <p onClick={onToggle}>Already have an account? Sign In</p>
    </form>
  );
};

export default SignUpForm;
