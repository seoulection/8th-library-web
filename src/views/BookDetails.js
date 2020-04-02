import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { borrowBook, returnBook, showBook } from '../api/BookAPI';
import Button from '../components/forms/Button';
import Loading from '../components/Loading';

function BookDetails() {
  let borrowingUser;
  let borrowButton;
  let returnButton;
  let { bookId } = useParams();

  const [book, setBook] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    showBook(bookId)
      .then(res => setBook(res.data))
      .catch(err => console.log(err))
  }, [bookId]);

  const onBorrowClick = () => {
    borrowBook(book.id)
      .then(res => setBook(res.data))
      .catch(err => console.log(err))
  }

  const onReturnClick = () => {
    returnBook(book.id)
      .then(res => setBook(res.data))
      .catch(err => console.log(err))
  }

  if (book) {
    if (book.borrower) {
      borrowingUser = <p>Borrowed by: {book.borrower.first_name} {book.borrower.last_name}</p>;
      if (book.borrower.id === user.id) {
        returnButton = <Button buttonText="Return" onButtonClick={onReturnClick} />
      }
    } else {
      borrowButton = <Button buttonText="Borrow" onButtonClick={onBorrowClick} />
    }

    return (
      <div data-testid="BookDetails" className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <h1>{book.title}</h1>
            <img src={book.image} alt={book.title} />
            <h4>Posted by: {book.owner.first_name} {book.owner.last_name}</h4>
          </div>
          <div className="col-6">
            <h2>Author: {book.author}</h2>
            <h3>Description: {book.description}</h3>
            {borrowingUser}
            {returnButton}
            {borrowButton}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default BookDetails;
