import React from 'react';
import { connect } from 'react-redux';
import BookList from '../components/BookList';
import { currentUser } from '../api/UserAPI';
import { getBooks } from '../api/BookAPI';

class Listings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableBooks: [],
      unavailableBooks: []
    }
  }

  componentDidMount() {
    this.storeBooks();
    this.getCurrentUser();
  }

  async getCurrentUser() {
    try {
      const response = await currentUser()
      this.props.signIn(response.data.current_user);
    } catch(err) {
      console.log(err);
    }
  }

  async storeBooks() {
    try {
      const { data } = await getBooks();
      console.log(data.books);
      if (data.books) {
        this.setState({
          availableBooks: data.books.filter(book => book.isAvailable === true),
          unavailableBooks: data.books.filter(book => book.isAvailable === false),
        });
      }
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    console.log(this.props.userId);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Available Books</h1>
            <BookList books={this.state.availableBooks} />
          </div>
          <div className="col-md-6">
            <h1>Unavailable Books</h1>
            <BookList books={this.state.unavailableBooks} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.userId };
}

export default connect(
  mapStateToProps,
  null,
)(Listings);
