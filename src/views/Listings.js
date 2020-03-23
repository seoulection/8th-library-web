import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { getBooks } from '../api/BookAPI';

function Listings() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [unavailableBooks, setUnavailableBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then(res => {
        setAvailableBooks(res.data.books.filter(book => book.isAvailable === true));
        setUnavailableBooks(res.data.books.filter(book => book.isAvailable === false));
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Available Books</h1>
          <BookList books={availableBooks} />
        </div>
        <div className="col-md-6">
          <h1>Unavailable Books</h1>
          <BookList books={unavailableBooks} />
        </div>
      </div>
    </div>
  );
};

export default Listings;
