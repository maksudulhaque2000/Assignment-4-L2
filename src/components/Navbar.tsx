import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ShelfWise
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>

        <div
          className={`
            md:flex md:items-center md:space-x-4
            ${isOpen ? "block" : "hidden"}
            absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent
            shadow-md md:shadow-none z-20 transition-all duration-300 ease-in-out
          `}
          onClick={() => setIsOpen(false)}
        >
          <Link
            to="/books"
            className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent md:hover:underline"
          >
            All Books
          </Link>
          <Link
            to="/create-book"
            className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent md:hover:underline"
          >
            Add Book
          </Link>
          <Link
            to="/borrow-summary"
            className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent md:hover:underline"
          >
            Borrow Summary
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
