import React from "react";
import BookCard from "./BookCard";
import AuthorCard from "./AuthorCard";

const BookList = ({ items, selectedMenu, onDeleted }) => {
    console.log(items);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {selectedMenu === "books"
        ? items.map((item) => <BookCard key={item._id} book={item} onDeleted={onDeleted} />)
        : items.map((item) => <AuthorCard key={item._id} author={item} onDeleted={onDeleted} />)}
    </div>
  );
};

export default BookList;
