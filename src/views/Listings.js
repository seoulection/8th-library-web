import React from 'react';
import BookList from '../components/BookList';
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
  }

  async storeBooks() {
    try {
      const { data } = await getBooks();
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

export default Listings;
