import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBookByIdQuery } from "../app/api/apiSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetBookByIdQuery(id as string, {
    skip: !id,
  });

  const book = responseData?.data;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-red-500 text-center bg-gray-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Book Not Found or Error</h2>
        <p className="text-lg mb-6">
          Could not load book details. Please check the book ID or try again
          later.
        </p>
        <Link
          to="/books"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Back to Book List
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Book Details: {book.title}
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
          <div className="col-span-2">
            <p className="font-semibold text-xl mb-2">Title:</p>
            <p>{book.title}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Author:</p>
            <p>{book.author}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Genre:</p>
            <p>{book.genre}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">ISBN:</p>
            <p>{book.isbn}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Copies Available:</p>
            <p>{book.copies}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Currently Available:</p>
            <p>{book.available ? "Yes" : "No"}</p>
          </div>
          <div className="col-span-2 mb-4">
            <p className="font-semibold">Description:</p>
            <p>{book.description || "No description available."}</p>
          </div>
          <div className="col-span-2 mb-4 text-sm text-gray-500">
            <p>Created At: {new Date(book.createdAt).toLocaleDateString()}</p>
            <p>Last Updated: {new Date(book.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <Link
            to="/books"
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-300"
          >
            Back to Book List
          </Link>
          <Link
            to={`/edit-book/${book._id}`}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
          >
            Edit Book
          </Link>
          <Link
            to={`/borrow/${book._id}`}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Borrow Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
