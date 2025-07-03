import React, { useState } from 'react';
import { useGetBooksQuery, useDeleteBookMutation } from '../app/api/apiSlice';
import { IBook } from '../types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';

const BookListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetBooksQuery({ page: currentPage, limit: itemsPerPage });

  const books = responseData?.data || [];
  const pagination = responseData?.pagination;

  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id).unwrap();
        toast.success('Book deleted successfully!');
        if (books.length === 1 && currentPage > 1 && pagination && pagination.totalItems - 1 <= (currentPage - 1) * itemsPerPage) {
          setCurrentPage(currentPage - 1);
        }
      } catch (err) {
        console.error('Failed to delete book:', err);
        toast.error('Failed to delete book!');
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= (pagination?.totalPages || 1)) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = pagination?.totalPages || 1;

  const pageNumbers = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (startPage === 1 && totalPages > 5) {
      endPage = 5;
  }
  if (endPage === totalPages && totalPages > 5) {
      startPage = totalPages - 4;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error loading books: {JSON.stringify(error)}</div>;
  }

  if (books.length === 0 && currentPage === 1) {
    return <div className="text-center py-8">No books found. Please add some!</div>;
  } else if (books.length === 0 && currentPage > 1) {
    return <div className="text-center py-8">No more books on this page.</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Books</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Copies</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book: IBook) => (
              <tr key={book._id}>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{book.isbn}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{book.copies}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                  {book.available ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      No
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/edit-book/${book._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    Delete
                  </button>
                  <Link to={`/borrow/${book._id}`} className="text-blue-600 hover:text-blue-900">
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalItems > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {startPage > 1 && <span className="px-4 py-2">...</span>}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 border rounded-md ${
                number === currentPage ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          ))}
          {endPage < totalPages && <span className="px-4 py-2">...</span>}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      {pagination && pagination.totalItems > 0 && (
        <div className="text-center mt-4 text-gray-600">
          Page {currentPage} of {totalPages} ({pagination.totalItems} total items)
        </div>
      )}
    </div>
  );
};

export default BookListPage;