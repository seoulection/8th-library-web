import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { borrowBook, returnBook } from '../../api/BookAPI';
import Button from '../forms/Button';

function Book(props) {
  const { user } = useAuthContext();
  const { author, borrowed_user, id, image, isAvailable, title } = props.book;

  const onBorrowClick = () => {
    const data = {
      book_id: id,
      is_available: isAvailable,
      user_id: user.id
    }

    borrowBook(data)
      .then(() => props.onAvailableChange())
      .catch(err => console.log(err))
  }

  const onReturnClick = () => {
    returnBook({ book_id: id })
      .then(() => props.onAvailableChange())
      .catch(err => console.log(err))
  }

  let borrowButton;
  let borrowingUser;
  let returnButton;
  if (borrowed_user) {
    borrowingUser = <p>Borrowed by: {borrowed_user.first_name} {borrowed_user.last_name}</p>;
    if (borrowed_user.id === user.id) {
      returnButton = <Button buttonText="Return" onButtonClick={onReturnClick}>Return</Button>
    }
  } else {
    borrowButton = <Button buttonText="Borrow" onButtonClick={onBorrowClick}>Borrow</Button>;
  }

  return (
    <li className="list-group-item">
      <div className="panel-body">
        <div className="col-md-4">
          <img className="card-img listing-img" src={image} alt={title} />
        </div>
        <div className="col-md-8">
          <h1>
            <Link to={`/books/${id}`}>{title}</Link>
          </h1>
          <h2>{author}</h2>
          {borrowingUser}
          {returnButton}
          {borrowButton}
        </div>
      </div>
    </li>
  );
}

export default Book;