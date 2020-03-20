import React from 'react';
import { connect } from 'react-redux';
import BookForm from '../components/BookForm';

class AddBook extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Add Book</h1>
        <BookForm />
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
)(AddBook);
