import React from "react";
import { Link } from "react-router-dom";
import errorPage from "../../assets/BrokerCell 404 Page.svg";

const ErrorStatus = ({ error = "Something went wrong!" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  dark:bg-gray-900 p-6">
      <div className="flex flex-col items-center space-y-2 max-w-md text-center bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg">
        <img
          src={errorPage}
          alt="Error Illustration"
          className="h-auto dark:invert"
        />
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
          Oops! An Error Occurred
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          {typeof error === "string"
            ? error
            : "An unexpected error has occurred. Please try again later."}
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorStatus;
