import React, { useState } from "react";
import { useCreateBookMutation } from "../app/api/apiSlice";
import { IBookFormInput } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const CreateBookPage: React.FC = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading, isError, error }] = useCreateBookMutation();

  const [formData, setFormData] = useState<IBookFormInput>({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 0,
  });

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

    if (!formData.genre) {
      toast.error("Please select a genre.");
      return;
    }

    try {
      await createBook(formData).unwrap();
      toast.success("Book created successfully!");
      navigate("/books");
    } catch (err) {
      console.error("Failed to create book:", err);
      toast.error(`Failed to create book: ${JSON.stringify(error)}`);
    }
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Book</h1>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Add Book"}
          </button>
          {isError && (
            <p className="text-red-500 text-sm">{JSON.stringify(error)}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateBookPage;
