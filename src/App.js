import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { signIn, signOut } from './actions';
import { currentUser } from './api/UserAPI';
import AddBook from './views/AddBook';
import BookDetails from './views/BookDetails';
import Listings from './views/Listings';
import Login from './views/Login';
import Navbar from './components/Navbar';

class App extends React.Component {
  async componentDidMount() {
    try {
      const response = await currentUser()
      this.props.signIn(response.data.current_user);
    } catch(err) {
      this.props.signOut();
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Router>
          <Navbar show={this.props.isSignedIn} />
          <Switch>
            <Route exact path="/">
              {this.props.isSignedIn ? <Redirect to="/listings" /> : <Login />}
            </Route>
            <Route path="/listings">
              {!this.props.isSignedIn ? <Redirect to="/" /> : <Listings />}
            </Route>
            <Route path="/books/add">
              {!this.props.isSignedIn ? <Redirect to="/" /> : <AddBook />}
            </Route>
            <Route path="/books/:bookId">
              {!this.props.isSignedIn ? <Redirect to="/" /> : <BookDetails />}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(App);
