import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddBook from './views/AddBook';
import BookDetails from './views/BookDetails';
import Listings from './views/Listings';
import UserDashboard from './views/UserDashboard';
import Navbar from './components/navbar/Navbar';

function AuthenticatedApp() {
  const [state, setState] = useState({
    filterQuery: '',
    showAvailableOnly: false
  });

  const handleOnCheckboxChange = checked => {
    setState(state => ({ ...state, showAvailableOnly: checked }));
  };

  const handleOnFilterChange = filterQuery => {
    setState(state => ({ ...state, filterQuery: filterQuery.toLowerCase() }));
  };

  const handleUnmounted = () => {
    setState(state => ({
      ...state,
      filterQuery: '',
      showAvailableOnly: false
    }));
  };

  return (
    <div className="container-fluid">
      <Navbar
        onCheckboxChange={handleOnCheckboxChange}
        onFilterChange={handleOnFilterChange}
      />
      <Switch>
        <Route
          exact path="/"
          render={props => (
            <Listings
              {...props}
              filterQuery={state.filterQuery}
              showAvailableOnly={state.showAvailableOnly}
              unmounted={handleUnmounted}
            />
          )}
        />
        <Route exact path="/books/add" component={AddBook} />
        <Route exact path="/books/:bookId" component={BookDetails} />
        <Route exact path="/dashboard" component={UserDashboard} />
      </Switch>
    </div>
  );
}

export default AuthenticatedApp;
