import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addBook } from '../api/BookAPI';
import { useAuthContext } from '../contexts/AuthContext';
import LabeledImageInput from './LabeledImageInput';
import LabeledTextInput from './LabeledTextInput';

function BookForm() {
  let history = useHistory();

  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = title => {
    setTitle(title);
  }

  const handleAuthorChange = author => {
    setAuthor(author);
  }

  const handleDescriptionChange = description => {
    setDescription(description);
  }

  const handleImageChange = image => {
    setImage(image);
  }

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      book: {
        title: title,
        author: author,
        description: description,
        image: image
      },
      user_id: user.id
    }

    addBook(data)
      .then(res => {
        history.push(`/books/${res.data.id}`);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="BookForm">
      <form onSubmit={handleSubmit}>
        <LabeledTextInput label="Title" value={title} onChange={handleTitleChange} />
        <LabeledTextInput label="Author" value={author} onChange={handleAuthorChange} />
        <LabeledTextInput label="Description" value={description} onChange={handleDescriptionChange} />
        <LabeledImageInput label="Image" onChange={handleImageChange} />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookForm;
