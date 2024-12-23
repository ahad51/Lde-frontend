import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for navigation
import axios from "axios"; // Import axios
import Global from '../../Assets/Images/Vector.png';
import Main from '../../Assets/Images/Group 1261155450.png';
import Logo from '../../Assets/Images/image 1.png';
import './Forget.css';

const Forget = () => {
  const [email, setEmail] = useState(""); // Store email input
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages
  const [successMessage, setSuccessMessage] = useState(""); // Store success message
  const [formErrors, setFormErrors] = useState({}); // Store form validation errors

  const navigate = useNavigate(); // Correct hook for navigation

  const loginNavigation = () => {
    navigate('/'); // Navigate to the login page
  };

  const handleChange = (e) => {
    setEmail(e.target.value); // Update email state on input change
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setFormErrors({ email: "Email is required." });
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setFormErrors({ email: "Please enter a valid email address." });
      setErrorMessage("Invalid email format.");
      return;
    }

    try {
      // Send POST request to forgot password API
      const response = await axios.post("http://127.0.0.1:8000/api/forgot-password/", { email });

      if (response.status === 200) {
        setSuccessMessage("Please check your email for the  password reset.");
        setErrorMessage(""); // Clear any previous error messages
        setFormErrors({}); // Clear form validation errors
        setEmail(""); // Reset email field
      }
    } catch (error) {
      if (error.response?.data) {
        const apiErrors = error.response.data;
        if (typeof apiErrors === "string") {
          setErrorMessage(apiErrors);
        } else if (typeof apiErrors === "object") {
          setFormErrors(apiErrors);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } else {
        setErrorMessage("Unable to connect to the server.");
      }
      setSuccessMessage(""); // Clear success message if there was an error
    }
  };

  const renderErrorMessages = () => {
    const allErrors = [];

    if (errorMessage) {
      allErrors.push(errorMessage);
    }

    Object.entries(formErrors).forEach(([field, errors]) => {
      const errorText = Array.isArray(errors) ? errors.join(", ") : errors;
      allErrors.push(`${field}: ${errorText}`);
    });

    return allErrors.length > 0 ? (
      <div className="error-message-container">
        {allErrors.map((error, index) => (
          <p key={index} className="error-message">
            {error}
          </p>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="main-component-login">
      <div className="first-container">
        <div className="logo-image-container-forget">
          <img src={Logo} className="logo" alt="Logo" />
        </div>
        <div className="login-criidentila-forget">
          <h4 className="criedential-text">Forgot your Password?</h4>

          <div className="tab-content-forget">
            <form className="login-form" onSubmit={handleSubmit}>
              <h4 className="sub-text-forget">Enter the email address associated with your account</h4>
              <h4 className="heading-email">Email</h4>
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={handleChange}
              />
            </form>
          </div>

          {/* Render error messages */}
          {renderErrorMessages()}

          {/* Success message */}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="submit-btn"   onClick={handleSubmit}  >CONTINUE</button>
        </div>
        <div className="login-btn">
          <button type="submit" className="submit-btn-forget" onClick={loginNavigation}>BACK TO LOGIN</button>
        </div>
      </div>

      <div className="second-container">
        <div className="second-sub-container">
          <div className="second-login">
            <img src={Global} className="global-image" alt="Global" />
            <h4 className="login-intro">
              Welcome to the Engineering Program and Teacher Portal Designed for All Educational Institutions!
            </h4>
            <img src={Main} className="main-image" alt="Main" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
