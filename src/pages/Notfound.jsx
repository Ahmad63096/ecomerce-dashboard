import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center createuser-container pt-4"
      style={{ minHeight: "100vh" }}
    >
      <h1>404 - Page Not Found</h1>
      <Link to="/dashboard" className="btn btn-primary">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
