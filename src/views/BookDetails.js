import React from 'react';
import { withRouter } from 'react-router-dom';
import { showBook } from '../api/BookAPI';

class BookDetails extends React.Component {
  state = {
    book: null
  }

  componentDidMount() {
    this.BookDetails();
  }

  async BookDetails() {
    try {
      const { bookId } = this.props.match.params;
      const response = await showBook(bookId);
      this.setState({ book: response.data });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.book) {
      const { title, author, description, image, id } = this.state.book;
      return (
        <div className="BookDetails">
          <h1>{title}</h1>
          <h3>{author}</h3>
          <h3>{description}</h3>
          <img src={image} alt={title} />
          <h3>{id}</h3>
        </div>
      );
    }
    return null;
  }
}

export default withRouter(BookDetails);
