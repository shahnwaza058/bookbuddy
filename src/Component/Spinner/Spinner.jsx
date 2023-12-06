import Spinner from "react-bootstrap/Spinner";
import React from "react";

const Spinners = () => {
  return (
    <div
      className="spinner d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vh" }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Spinners;
