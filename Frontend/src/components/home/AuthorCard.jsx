import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";
import { useState } from "react";

const AuthorCard = ({ author, onEdit, onDeleted }) => {
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
        <h2 className="text-xl font-semibold text-gray-800">
          {author.name} {author.lastName}
        </h2>
        <p className="text-gray-600">Nationality: {author.nationality}</p>
        {author.books && author.books.length > 0 && (
          <div className="mt-2">
            <h3 className="text-lg font-semibold">Books:</h3>
            <ul className="list-disc list-inside">
              {author.books.map((book, index) => (
                <li key={index} className="text-gray-600">
                  {book.title} (Published on:{" "}
                  {new Date(book.publicationDate).toLocaleDateString()})
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
        {visibilityEdit && (
          <EditModal
            context={"author"}
            label={author.name}
            setVisibility={setVisibilityEdit}
            elementId={author._id}
          />
        )}
        {visibilityDelete && (
          <DeleteModal
            context={"author"}
            onDeleted={onDeleted}
            label={author.name}
            setVisibility={setVisibilityDelete}
            elementId={author._id}
          />
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
