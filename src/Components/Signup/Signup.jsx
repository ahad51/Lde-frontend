import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import axios from "axios"; // Import axios
import './Signup.css'; // Ensure this file exists

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    school_name: "",
    location: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePassword = (password) => password.length >= 8;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, email, password, school_name, location } = formData;
    const newFormErrors = {};

    // Check if all fields are filled
    if (!full_name) newFormErrors.full_name = "Full Name is required.";
    if (!email) newFormErrors.email = "Email is required.";
    if (!password) newFormErrors.password = "Password is required.";
    if (!school_name) newFormErrors.school_name = "School Name is required.";
    if (!location) newFormErrors.location = "Location is required.";

    // Validate email
    if (email && !validateEmail(email)) {
      newFormErrors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (password && !validatePassword(password)) {
      newFormErrors.password = "Password must be at least 8 characters long.";
    }

    // If there are errors, set them and return
    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
      setErrorMessage("Please fix the errors above.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/signup/`,
        formData
      );
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Signup successful! Please Check your email for verifacation!!");
        setErrorMessage("");
        setFormErrors({});
        setFormData({
          full_name: "",
          email: "",
          password: "",
          school_name: "",
          location: "",
        });
      }
    } catch (error) {
      if (error.response?.data) {
        const apiErrors = error.response.data;
        console.log("API Errors:", apiErrors); // Log the error for debugging
        if (typeof apiErrors === "string") {
          setErrorMessage(apiErrors); // Display string errors
        } else if (typeof apiErrors === "object") {
          setFormErrors(apiErrors); // Field-specific errors
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } else {
        setErrorMessage("Unable to connect to the server.");
      }
      setSuccessMessage("");
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
    <form className="login-form" onSubmit={handleSubmit}>
      <h4 className="sub-text">
        Fill your email address and password to sign up your account.
      </h4>
      <h4 className="heading-email">Full Name</h4>
      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        className="input-field-signup"
        value={formData.full_name}
        onChange={handleChange}
        required
      />

      <h4 className="heading-email">Email</h4>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input-field-signup"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <h4 className="heading-email">Password</h4>
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="input-field-signup"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <span
          className="password-toggle-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <h4 className="heading-email">School Name</h4>
      <input
        type="text"
        name="school_name"
        placeholder="School Name"
        className="input-field-signup"
        value={formData.school_name}
        onChange={handleChange}
        required
      />

      <h4 className="heading-email">Location</h4>
      <input
        type="text"
        name="location"
        placeholder="Location"
        className="input-field-signup"
        value={formData.location}
        onChange={handleChange}
        required
      />

      {renderErrorMessages()}

      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="button-submit-signup">
        <button type="submit" className="submit-btn-signup">
          Signup
        </button>
      </div>
    </form>
  );
};

export default Signup;
