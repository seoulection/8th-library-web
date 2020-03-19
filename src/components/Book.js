import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book: { author, description, id, image, title } }) => {
  return (
    <div className="Book">
      <Link to={`/books/${id}`}>{title}</Link>
      <h2>{author}</h2>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  );
}

export default Book;
