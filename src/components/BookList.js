import React from 'react';
import Book from './Book';

const BookList = props => {
  let renderedList;
  if (props.books) {
    renderedList = props.books.map(book => {
      return <Book key={book.id} book={book} />;
    });
  }

  return (
    <div className="scrollable">
      {renderedList}
    </div>
  );
}

export default BookList;
