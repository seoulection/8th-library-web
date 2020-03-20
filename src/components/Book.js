import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book: { author, description, id, image, title } }) => {
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
          <p>{description}</p>
          <button onClick={() => alert('hello')}>Hey</button>
        </div>
      </div>
    </div>
  );
}

export default Book;
