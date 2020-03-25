import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addBook } from '../../api/BookAPI';
import { useAuthContext } from '../../contexts/AuthContext';
import LabeledImageInput from './LabeledImageInput';
import LabeledTextInput from './LabeledTextInput';

function BookForm() {
  let history = useHistory();

  const { user } = useAuthContext();
  const [state, setState] = useState({
    title: '',
    author: '',
    description: '',
    image: null
  });

  const handleTitleChange = title => setState(state => ({ ...state, title: title }));

  const handleAuthorChange = author => setState(state => ({ ...state, author: author }));

  const handleDescriptionChange = description => setState(state => ({ ...state, description: description }));

  const handleImageChange = image => setState(state => ({ ...state, image: image }));

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      book: {
        title: state.title,
        author: state.author,
        description: state.description,
        image: state.image
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
        <LabeledTextInput
          label="Title"
          value={state.title}
          onChange={handleTitleChange}
        />
        <LabeledTextInput
          label="Author"
          value={state.author}
          onChange={handleAuthorChange}
        />
        <LabeledTextInput
          label="Description"
          value={state.description}
          onChange={handleDescriptionChange}
        />
        <LabeledImageInput
          label="Image"
          onChange={handleImageChange}
        />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookForm;
