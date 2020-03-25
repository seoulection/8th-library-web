import React from 'react';
import BookForm from '../components/forms/BookForm';

function AddBook() {
  return (
    <div data-testid="AddBook" className="container">
      <h1 className="text-center">Add Book</h1>
      <BookForm />
    </div>
  );
}

export default AddBook;
