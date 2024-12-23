import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Global from '../../Assets/Images/Vector.png';
import Main from '../../Assets/Images/Group 1261155450.png';
import Logo from '../../Assets/Images/image 1.png';
import { useNavigate, useParams } from "react-router-dom"; // Correct import for navigation
import './reset.css';

const Reset = () => {
  const { uid, token } = useParams(); // Get UID and Token from URL params
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState(""); // Error state for validation
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/password-reset-confirm/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }), 
      });

      const result = await response.json();

      if (response.ok) {
        // Password reset successful, navigate to login page
        navigate('/');
      } else {
        setError(result.detail || "Failed to reset password.");
      }
    } catch (err) {
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div className="main-component-login">
      <div className="first-container">
        <div className="logo-image-container-forget">
          <img src={Logo} className="logo" alt="Logo" />
        </div>
        <div className="login-criidentila-forget">
          <h4 className="criedential-text">Create New Password</h4>

          <div className="tab-content-forget">
            <form className="login-form" onSubmit={handleSubmit}>
              <h4 className="sub-text-reset">Your new password must be different from previously used passwords.</h4>
              <h4 className="reset-password">New Password</h4>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="input-field"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <h4 className="reset-password">Confirm Password</h4>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {error && <div className="error-message">{error}</div>}
              <div className="reset-btn">
              <button type="submit" className="submit-btn">UPDATE PASSWORD</button>
              </div>
            </form>
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

export default Reset;
