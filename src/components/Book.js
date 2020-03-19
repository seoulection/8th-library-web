import React from 'react';

const Book = ({ book: { author, description, id, image, title } }) => {
  return (
    <div className="Book">
      <h1>{title}</h1>
      <h2>{author}</h2>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  );
}

export default Book;
