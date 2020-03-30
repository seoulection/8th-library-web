import React, { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import BookList from '../components/book/BookList';
import { showUser } from '../api/UserAPI';

function UserDashboard() {
  const { user } = useAuthContext();
  const [state, setState] = useState({
    user: {},
    userBooks: [],
    userBorrowedBooks: []
  });

  const loadUser = useCallback(() => {
    showUser(user.id)
      .then(res => {
        setState(state => ({
          ...state,
          user: res.data.user,
          userBooks: res.data.user.owned_books,
          userBorrowedBooks: res.data.user.borrowed_books.filter(book => book.borrower)
        }))
      })
      .catch(err => console.log(err))
  }, [user.id]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div data-testid="UserDashboard" className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>My Books</h1>
          <BookList books={state.userBooks} onAvailableChange={loadUser} />
        </div>
        <div className="col-md-6">
          <h1>Books I'm Borrowing</h1>
          <BookList books={state.userBorrowedBooks} onAvailableChange={loadUser} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
