import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import Global from '../../Assets/Images/Vector.png';
import Main from '../../Assets/Images/Group 1261155450.png';
import Logo from '../../Assets/Images/image 1.png';
import Signup from "../Signup/Signup";
import './login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const navigation = () => {
    navigate('/forget');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        // Redirect user to the dashboard or home page after successful login
        navigate('/dashboard'); // Replace with the actual path you want to redirect to
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="main-component-login">
      <div className="first-container">
        <div className={`logo-image-container ${activeTab === "login" ? "logo-image-container-login" : "logo-image-container-signup"}`}>
          <img src={Logo} className="logo" alt="Logo" />
        </div>
        <div className={`${activeTab === "register" ? "signup-criidentilas" : "login-criidentilas"}`}>
          <h4 className="criedential-text">Please Login to Your Account</h4>

          {/* Tabs for Login and Register */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "login" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`tab ${activeTab === "register" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>
          {/* Form content based on active tab */}
          <div className="tab-content">
            {activeTab === "login" ? (
              <form className="login-form" onSubmit={handleSubmit}>
                <h4 className="sub-text">Fill your email address and password to sign in your account.</h4>
                <h4 className="heading-email">Email</h4>
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <h4 className="heading-email">Password</h4>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="form-options">
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                  <a className="forgot-password" onClick={navigation}>Forgot Password?</a>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="submit-btn">Login</button>
              </form>
            ) : (
              <Signup />
            )}
          </div>
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

export default Login;
