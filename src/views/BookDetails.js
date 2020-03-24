import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { borrowBook, returnBook, showBook } from '../api/BookAPI';

function BookDetails() {
  let { bookId } = useParams();

  const [book, setBook] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    showBook(bookId)
      .then(res => setBook(res.data))
      .catch(err => console.log(err))
  }, [bookId]);

  const onBorrowClick = () => {
    const data = {
      book_id: book.id,
      is_available: book.isAvailable,
      user_id: user.id
    }

    borrowBook(data)
      .then(res => setBook(res.data))
      .catch(err => console.log(err))
  }

  const onReturnClick = () => {
    returnBook({ book_id: book.id })
      .then(res => setBook(res.data))
      .catch(err => console.log(err))
  }

  let borrowingUser;
  let borrowButton;
  let returnButton;

  if (book) {
    if (book.borrowed_user) {
      borrowingUser = <p>Borrowed by: {book.borrowed_user.first_name} {book.borrowed_user.last_name}</p>;
      if (book.borrowed_user.id === user.id) {
        returnButton = <button className="btn btn-primary" onClick={onReturnClick}>Return</button>;
      }
    } else {
      borrowButton = <button className="btn btn-primary" onClick={onBorrowClick}>Borrow</button>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>{book.title}</h1>
            <img src={book.image} alt={book.title} />
          </div>
          <div className="col-md-6">
            <h3>Author: {book.author}</h3>
            <h3>Rating: 4.5/5</h3>
            <h3>Description: {book.description}</h3>
            {borrowingUser}
            {returnButton}
            {borrowButton}
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Book not loaded</h1>;
  }
}

export default BookDetails;
