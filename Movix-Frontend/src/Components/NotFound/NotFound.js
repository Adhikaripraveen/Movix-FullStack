import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
     
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">
        Sorry, the page you are looking for does not exist. Please check the URL or go back to the homepage.
      </p>
    </div>
  );
};

export default NotFound;
