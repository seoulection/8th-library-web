import React from 'react';
import Resizer from 'react-image-file-resizer';
import { connect } from 'react-redux';
import { addBook } from '../api/BookAPI';

class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      description: '',
      image: null
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleImageChange(event) {
    var fileInput = false
      if(event.target.files[0]) {
        fileInput = true
      }
      if(fileInput) {
        Resizer.imageFileResizer(
          event.target.files[0],
          140,
          200,
          'JPEG',
          100,
          0,
          uri => {
            this.setState({ image: uri });
          },
          'base64'
        );
      }
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const data = {
        book: {
          title: this.state.title,
          author: this.state.author,
          description: this.state.description,
          image: this.state.image
        },
        user_id: this.props.userId
      }
      await addBook(data);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="BookForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </label>
          <br />
          <label>
            Author:
            <input type="text" value={this.state.author} onChange={this.handleAuthorChange} />
          </label>
          <br />
          <label>
            Description:
            <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
          </label>
          <br />
          <label>
            Image:
            <input type="file" accept=".jpg,.jpeg,.png" onChange={this.handleImageChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.userId };
}

export default connect(
  mapStateToProps,
  null
)(BookForm);
