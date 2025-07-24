import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        error = value ? "" : "Name is required.";
        break;
      case "email":
        error = value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email.";
        break;
      case "phoneNumber":
        error = value && /^\d{10}$/.test(value)
          ? ""
          : "Please enter a valid 10-digit phone number.";
        break;
      case "password":
        error = value.length >= 6
          ? ""
          : "Password should be at least 6 characters.";
        break;
      case "confirmPassword":
        error =
          value === formData.password
            ? ""
            : "Passwords do not match.";
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
      // console.log("Validation failed:", newErrors);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    setErrors({});
    // console.log("Form data before submission:", formData);

    fetch(process.env.REACT_APP_API_URLSIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.Message?.toLowerCase().includes("already")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "This email already exists.",
          }));
          setSuccessMessage("");
        } else {
          // console.log("Signup successful:", data);
          setSuccessMessage(data.Message);
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          });
        }
      })    
      // .then((data) => {
      //   console.log("Signup successful:", data);
      //   setSuccessMessage(data.message);
      //   setFormData({
      //     name: "",
      //     email: "",
      //     phoneNumber: "",
      //     password: "",
      //     confirmPassword: "",
      //   });
      // })
      .catch((error) => {
        console.error("Error occurred:", error);
        setSuccessMessage("");
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 2000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [successMessage]);

  return (
    <div className="p-4 m-3  settings-container ">
      <h2 className="text-center" >Create New User</h2>
      <div
        className="d-flex justify-content-center align-items-center createuser-container pt-4"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="card p-4 form-wrap"
          style={{ width: "100%", maxWidth: "400px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
        >
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control main-search"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
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
              <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control main-search"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
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
            <div className="mb-3">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control main-search"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="input-group-text eyebutton"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <i className={showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                </button>
              </div>
              {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3 submit-button">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default CreateUserForm;