import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../app/api/apiSlice";
import { IBookFormInput } from "../types";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: responseData,
    isLoading: isLoadingBook,
    isError: isErrorBook,
    error: errorBook,
  } = useGetBookByIdQuery(id!, {
    skip: !id,
  });
  const book = responseData?.data;

  const [
    updateBook,
    {
      isLoading: isUpdatingBook,
      isError: isErrorUpdating,
      error: errorUpdating,
    },
  ] = useUpdateBookMutation();

  const [formData, setFormData] = useState<IBookFormInput>({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 0,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!formData.genre) {
      toast.error("Please select a genre.");
      return;
    }

    try {
      await updateBook({
        id,
        changes: { ...formData, available: formData.copies > 0 },
      }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch (err) {
      console.error("Failed to update book:", err);
      toast.error(`Failed to update book: ${JSON.stringify(errorUpdating)}`);
    }
  };

  if (isLoadingBook || isUpdatingBook) {
    return <LoadingSpinner />;
  }

  if (isErrorBook) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading book: {JSON.stringify(errorBook)}
      </div>
    );
  }

  if (!book) {
    return <div className="text-center py-8">Book not found.</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Edit Book: {book.title}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Genre:
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="FICTION">FICTION</option>
            <option value="NON_FICTION">NON_FICTION</option>
            <option value="SCIENCE">SCIENCE</option>
            <option value="HISTORY">HISTORY</option>
            <option value="BIOGRAPHY">BIOGRAPHY</option>
            <option value="FANTASY">FANTASY</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="isbn"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ISBN:
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="copies"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Copies:
          </label>
          <input
            type="number"
            id="copies"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            required
            min="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isUpdatingBook}
          >
            {isUpdatingBook ? "Updating..." : "Update Book"}
          </button>
          {isErrorUpdating && (
            <p className="text-red-500 text-sm">
              {JSON.stringify(errorUpdating)}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditBookPage;
