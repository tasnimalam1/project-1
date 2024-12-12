import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
        {/* Message */}
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        {/* Back to Home Button */}
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-secondary transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
