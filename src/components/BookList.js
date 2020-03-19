import React from 'react';
import Book from './Book';

const BookList = ({ books }) => {
  let renderedList;
  if (books) {
    renderedList = books.map(book => {
      return <Book key={book.id} book={book} />;
    });
  } else {
    renderedList = 'No books were found';
  }

  return (
    <div className="BookList">
      {renderedList}
    </div>
  );
}

export default BookList;
