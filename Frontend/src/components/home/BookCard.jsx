import React, { useState } from "react";
import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";

const BookCard = ({ book, onEdit, onDeleted }) => {
  const [visibilityEdit, setVisibilityEdit] = useState(false);
  const [visibilityDelete, setVisibilityDelete] = useState(false);

  const handleChangeVisibilityEdit = () => {
    setVisibilityEdit(!visibilityEdit);
  };
  const handleChangeVisibilityDelete = () => {
    setVisibilityDelete(!visibilityDelete);
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
        <p className="text-gray-600">
          Publication Date:{" "}
          {new Date(book.publicationDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">Pages: {book.pages}</p>
        {book.authors && book.authors.length > 0 && (
          <div className="mt-2">
            <h3 className="text-lg font-semibold">Authors:</h3>
            <ul className="list-disc list-inside">
              {book.authors.map((author, index) => (
                <li key={index} className="text-gray-600">
                  {author.firstName} {author.lastName}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={handleChangeVisibilityEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={handleChangeVisibilityDelete}
          >
            Delete
          </button>
        </div>
      </div>
      {visibilityEdit && (
        <EditModal
          context={"book"}
          label={book.title}
          setVisibility={setVisibilityEdit}
          elementId={book._id}
        />
      )}
      {visibilityDelete && (
        <DeleteModal
          context={"libro"}
          onDeleted={onDeleted}
          label={book.title}
          setVisibility={setVisibilityDelete}
          elementId={book._id}
        />
      )}
    </div>
  );
};

export default BookCard;
