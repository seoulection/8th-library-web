import React from 'react';
import Book from './Book';

const BookList = props => {
  let renderedList;
  if (props.books) {
    renderedList = props.books.map(book => {
      return <Book key={book.id} book={book} onAvailableChange={props.onAvailableChange} />;
    });
  }

  return (
    <div data-testid="BookList" className="d-flex align-content-start flex-wrap justify-content-center">
      {renderedList}
    </div>
  );
}

export default BookList;
