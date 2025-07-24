import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        error = value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email.";
        break;
      case "password":
        error = value.length >= 6 ? "" : "Password must be at least 6 characters.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    // console.log("Form Submitted", formData);

    fetch(process.env.REACT_APP_API_URLLOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Login Successful", data);
        localStorage.setItem("authToken", data.access_token);
        setSuccessMessage("Login successful! Redirecting..."); // Set success message
        setTimeout(() => {
          setSuccessMessage(""); // Clear message after 2 seconds
          navigate("/dashboard"); // Redirect to dashboard
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrors({ login: "Invalid credentials. Please try again." });
      });
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center createuser-container pt-4"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="mb-5">Welcome to QUBIT Dashboard</h1>
      <div
        className="card p-4 form-wrap pb-5 pt-4"
        style={{ width: "100%", maxWidth: "350px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
      >
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <h2 className="text-center">Login Now</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 py-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control main-search"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control main-search"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="input-group-text eyebutton"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </button>
            </div>
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          {errors.login && <div className="text-danger text-center">{errors.login}</div>}
          <button type="submit" className="btn btn-primary w-100 mt-3 submit-button">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Forgot Password?{" "}
          <Link to={`/login`}>Reset it here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
