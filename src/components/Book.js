import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { borrowBook } from '../api/BookAPI';

class Book extends React.Component {
  borrowBook = async () => {
    try {
      const data = {
        book_id: this.props.book.id,
        is_available: this.props.book.isAvailable,
        user_id: this.props.userId
      };

      await borrowBook(data);
      window.location.reload();
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { author, id, image, title, borrowed_user } = this.props.book;
    let button;
    let borrowingUser;
    if (borrowed_user) {
      borrowingUser = <p>Borrowed by: {borrowed_user.first_name} {borrowed_user.last_name}</p>;
    } else {
      button = <button className="btn btn-primary" onClick={this.borrowBook}>Borrow</button>;
    }
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
            <p>Rating: 4.5/5</p>
            {borrowingUser}
            {button}
          </div>
        </div>
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
)(Book));
