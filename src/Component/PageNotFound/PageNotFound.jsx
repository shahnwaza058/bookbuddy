import React from "react";
import { Link } from "react-router-dom";
import { BsExclamationTriangle } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";

function PageNotFound() {
  return (
    <div className="page-container text-center p-5 mt-5 d-flex justify-content-center flex-column align-items-center">
      <BsExclamationTriangle size={80} className="text-danger" />
      <h1 className="mt-3">404 - Page Not Found</h1>
      <p className="lead">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-3">
        <Button variant="outline-danger" className="w-full">
          Go to Home
        </Button>
      </Link>
    </div>
  );
}

export default PageNotFound;
