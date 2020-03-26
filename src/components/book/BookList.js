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
    <div data-testid="BookList" className="scrollable">
      <ul className="list-group">
        {renderedList}
      </ul>
    </div>
  );
}

export default BookList;
