import React, { useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";

export const CreateBookForm = ({ onClose, setBooksData }) => {
  const [authorsList, setAuthorsList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "", // Debe almacenar el ID del autor
    publicationDate: "",
    pages: "",
  });

  const { data, errorFetch, loadingFetch } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/author/authors`
  );

  useEffect(() => {
    if (data) {
      console.log("Data fetched: ", data); 
      setAuthorsList(data);
    }
  }, [data]);

  const { postData, error, loading } = usePost(
    `${import.meta.env.VITE_BASE_URL}/book/create`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData(formData);
      setBooksData((prevBooks) => [...prevBooks, formData]);
      onClose();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Create a new Book</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            placeholder="Title of the book"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="author">
            Author
          </label>
          {loadingFetch ? (
            <p>Loading authors...</p>
          ) : errorFetch ? (
            <p>Error loading authors</p>
          ) : (
            <select
              name="author"
              id="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              required
            >
              <option value="">Select Author</option>
              {authorsList.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name} {author.lastName}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="publicationDate">
            Publication date
          </label>
          <input
            type="date"
            name="publicationDate"
            id="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="pages">
            Number of Pages
          </label>
          <input
            placeholder="Number..."
            type="number"
            name="pages"
            id="pages"
            value={formData.pages}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Book
          </button>
        </div>
      </form>
    </div>
  );
};
