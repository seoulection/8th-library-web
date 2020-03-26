import React, { useEffect, useState } from 'react';
import BookList from '../components/book/BookList';
import { getBooks } from '../api/BookAPI';

function Listings() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [unavailableBooks, setUnavailableBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    getBooks()
      .then(res => {
        setAvailableBooks(res.data.books.filter(book => book.isAvailable === true));
        setUnavailableBooks(res.data.books.filter(book => book.isAvailable === false));
      })
      .catch(err => console.log(err))
  }

  return (
    <div data-testid="Listings" className="container">
      <div className="row">
        <div data-testid="AvailableBooks" className="col-md-6">
          <h1>Available Books</h1>
          <BookList books={availableBooks} onAvailableChange={loadBooks} />
        </div>
        <div data-testid="UnavailableBooks" className="col-md-6">
          <h1>Unavailable Books</h1>
          <BookList books={unavailableBooks} onAvailableChange={loadBooks} />
        </div>
      </div>
    </div>
  );
};

export default Listings;
