import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import BookList from '../components/BookList';
import { showUser } from '../api/UserAPI';

function UserDashboard() {
  const { user } = useAuthContext();
  const [state, setState] = useState({
    user: {},
    userBooks: [],
    userBorrowedBooks: []
  });

  useEffect(() => {
    showUser(user.id)
      .then(res => {
        setState(state => ({
          ...state,
          user: res.data.user,
          userBooks: res.data.user.books,
          userBorrowedBooks: res.data.user.borrowed_books.filter(book => book.borrowed_user)
        }))
      })
      .catch(err => console.log(err))
  }, [user.id]);

  console.log('the state is');
  console.log(state);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>My Books</h1>
          <BookList books={state.userBooks} />
        </div>
        <div className="col-md-6">
          <h1>Books I'm Borrowing</h1>
          <BookList books={state.userBorrowedBooks} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
