import React from 'react';
import { connect } from 'react-redux';
import BookForm from '../components/BookForm';

class AddBook extends React.Component {
  render() {
    return (
      <div className="AddBook">
        <h1>Add Book Page</h1>
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
