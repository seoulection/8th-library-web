import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { borrowBook } from '../api/BookAPI';

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
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  }

  let button;
  let borrowingUser;
  if (borrowed_user) {
    borrowingUser = <p>Borrowed by: {borrowed_user.first_name} {borrowed_user.last_name}</p>;
  } else {
    button = <button className="btn btn-primary" onClick={onBorrowClick}>Borrow</button>;
  }

  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <div className="col-md-4">
          <img className="card-img listing-img" src={image} alt={title} />
        </div>
        <div className="col-md-8">
          <h1>
            <Link to={`/books/${id}`}>{title}</Link>
          </h1>
          <h2>{author}</h2>
          <p>Rating: 4.5/5</p>
          {borrowingUser}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Book;
