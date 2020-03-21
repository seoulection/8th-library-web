import React from 'react';
import Resizer from 'react-image-file-resizer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

    console.log(this.props.userId);
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
          400,
          400,
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
      const { data: { id } } = await addBook(data);
      this.props.history.push(`/books/${id}`);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    console.log(this.props.userId);
    return (
      <div className="BookForm">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="bookTitle">Title</label>
            <input
              className="form-control"
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bookAuthor">Author</label>
            <input
              className="form-control"
              type="text"
              value={this.state.author}
              onChange={this.handleAuthorChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bookDescription">Description</label>
            <textarea
              className="form-control"
              type="text"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bookImage">Image</label>
            <input
              className="form-control"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={this.handleImageChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.userId };
}

export default withRouter(connect(
  mapStateToProps,
  null
)(BookForm));
