import React, { useState } from "react";
import usePost from "../../hooks/usePost";

export const CreateAuthorForm = ({ onClose, setAuthorsData }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    nationality: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //ACA SE DEBE IMPLEMENTAR EL HOOK USEPOST PARA ENVIAR LOS DATOS DEL FORMULARIO
  //SE DEBE USAR LA VARIABLE DE ENTORNO
  const { postData, error, loading } = usePost(
    `${import.meta.env.VITE_BASE_URL}/author/create`
  );

  const handleSubmit = async (e) => {
    try {
      await postData(formData);
    } catch (e) {
      alert(e.message)
    }
  };


  //SE DEBE ENVIAR EL OBJETO formData CON LA FUNCION QUE PROPORCIONA EL HOOK usePost
  //SE DEBE MANEJAR EL ESTADO DE LA RESPUESTA Y EL ERROR
  const handleSubmitCreateAuthor = async (e) => {
    e.preventDefault();
    try {
      setAuthorsData((prevAuthors) => [...prevAuthors, formData]);
      onClose();
    } catch (error) {
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmitCreateAuthor}
        className="max-w-lg w-full p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Create a new Author</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            placeholder="Author's name"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            placeholder="Author's last name"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="nationality"
          >
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            value={formData.nationality}
            placeholder="Author's nationality"
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
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Author
          </button>
        </div>
      </form>
    </div>
  );
};
