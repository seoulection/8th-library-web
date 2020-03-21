import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showBook, borrowBook } from '../api/BookAPI';

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

  borrowBook = async () => {
    try {
      const data = {
        book_id: this.state.book.id,
        is_available: this.state.book.isAvailable,
        user_id: this.props.userId
      };

      const response = await borrowBook(data);
      this.setState({ book: response.data });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.book) {
      const { author, description, image, title, borrowed_user } = this.state.book;
      let borrowingUser;
      let button;
      if (borrowed_user) {
        borrowingUser = <p>Borrowed by: {borrowed_user.first_name} {borrowed_user.last_name}</p>;
      } else {
        button = <button className="btn btn-primary" onClick={this.borrowBook}>Borrow</button>;
      }
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>{title}</h1>
              <img src={image} alt={title} />
            </div>
            <div className="col-md-6">
              <h3>Author: {author}</h3>
              <h3>Rating: 4.5/5</h3>
              <h3>Description: {description}</h3>
              {borrowingUser}
              {button}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.userId };
}

export default withRouter(connect(
  mapStateToProps,
  null
)(BookDetails));
