import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddBook from './views/AddBook';
import BookDetails from './views/BookDetails';
import Listings from './views/Listings';
import Navbar from './components/Navbar';

function AuthenticatedApp() {
  return (
    <div className="container-fluid">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Listings} />
        <Route exact path="/books/add" component={AddBook} />
        <Route exact path="/books/:bookId" component={BookDetails} />
      </Switch>
    </div>
  );
}

export default AuthenticatedApp;
