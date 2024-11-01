import React from 'react';

const ListSelector = ({handleMenuSelect, selectedMenu}) => {
    return (
        <div className="flex justify-center items-center gap-6 bg-black text-white p-2 ">
        <button
          onClick={() => handleMenuSelect("books")}
          className={`text-lg px-4 py-1 rounded cursor-pointer ${
            selectedMenu === "books" ? "bg-gray-700" : "hover:bg-gray-600"
          }`}
        >
          Books
        </button>
        <button
          onClick={() => handleMenuSelect("authors")}
          className={`text-lg px-4 py-1 rounded cursor-pointer ${
            selectedMenu === "authors" ? "bg-gray-700" : "hover:bg-gray-600"
          }`}
        >
          Authors
        </button>
      </div>
    );
};

export default ListSelector;