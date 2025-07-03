import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-8 rounded-lg text-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">
        Welcome to the Library Management System 📚
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl">
        Your ultimate solution for managing books and tracking borrowing
        activities efficiently. Explore our collection, add new books, update
        existing ones, and keep a track of borrowed items—all in one place.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/books"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          View All Books
        </Link>
        <Link
          to="/create-book"
          className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
        >
          Add New Book
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
