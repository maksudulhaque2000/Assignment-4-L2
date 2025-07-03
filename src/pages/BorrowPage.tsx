import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery, useBorrowBookMutation } from '../app/api/apiSlice';
import { IBorrowFormInput } from '../types';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoadingSpinner from '../components/LoadingSpinner';

const MySwal = withReactContent(Swal);

const BorrowPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: responseData, isLoading: isLoadingBook, isError: isErrorBook, error: errorBook } = useGetBookByIdQuery(bookId!, {
    skip: !bookId,
  });
  const book = responseData?.data;

  const [borrowBook, { isLoading: isBorrowing, isError: isErrorBorrowing, error: errorBorrowing }] = useBorrowBookMutation();

  const [formData, setFormData] = useState<IBorrowFormInput>({
    book: bookId || '',
    quantity: 1,
    dueDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (bookId) {
      setFormData((prev) => ({ ...prev, book: bookId }));
    }
  }, [bookId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;

    if (!book) {
      toast.error('Book details not loaded. Please wait or refresh.');
      return;
    }
    if (formData.quantity <= 0 || formData.quantity > book.copies) {
      MySwal.fire({
        icon: 'error',
        title: 'Invalid Quantity',
        text: `Quantity must be between 1 and ${book.copies} (available copies).`,
      });
      return;
    }

    try {
      await borrowBook({ ...formData, dueDate: new Date(formData.dueDate).toISOString() }).unwrap();
      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (err) {
      console.error('Failed to borrow book:', err);
      toast.error(`Failed to borrow book: ${JSON.stringify(errorBorrowing)}`);
    }
  };

  if (isLoadingBook || isBorrowing) {
    return <LoadingSpinner />;
  }

  if (isErrorBook) {
    return <div className="text-center py-8 text-red-500">Error loading book: {JSON.stringify(errorBook)}</div>;
  }

  if (!book) {
    return <div className="text-center py-8">Book not found or not available for borrowing.</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Borrow Book: {book.title}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Book Title:</label>
          <p className="text-gray-900">{book.title}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Available Copies:</label>
          <p className="text-gray-900">{book.copies}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            max={book.copies}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isBorrowing || book.copies === 0}
          >
            {isBorrowing ? 'Borrowing...' : 'Borrow Book'}
          </button>
          {isErrorBorrowing && <p className="text-red-500 text-sm">{JSON.stringify(errorBorrowing)}</p>}
        </div>
      </form>
    </div>
  );
};

export default BorrowPage;