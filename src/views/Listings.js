import React, { useEffect, useState } from 'react';
import BookList from '../components/book/BookList';
import { getBooks } from '../api/BookAPI';

function Listings(props) {
  const [state, setState] = useState({
    books: []
  });

  useEffect(() => {
    loadBooks();
    return function cleanup() {
      props.unmounted();
    };
  }, []);

  const loadBooks = () => {
    getBooks()
      .then(({ data: { books } }) => {
        setState(state => ({ ...state, books: books }));
      })
      .catch(err => console.log(err))
  }

  let bookList;

  if (props.filterQuery) {
    bookList = state.books.filter(book => book.title.toLowerCase().includes(props.filterQuery));
  } else {
    bookList = state.books;
  }

  if (props.showAvailableOnly) {
    bookList = bookList.filter(book => book.isAvailable === true);
  }

  return (
    <div data-testid="Listings">
      <div data-testid="AvailableBooks">
        <h1 className="text-center">All Books</h1>
        <BookList className="d-flex flex-wrap justify-content-center" books={bookList} onAvailableChange={loadBooks} />
      </div>
    </div>
  );
};

export default Listings;
