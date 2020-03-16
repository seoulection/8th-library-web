import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import Listings from './views/Listings';
import Login from './views/Login';

class App extends React.Component {
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login}>
              {this.props.isSignedIn ? <Redirect to="/listings" /> : <Login />}
            </Route>
            <Route path="/listings" component={Listings}>
              {!this.props.isSignedIn ? <Redirect to="/" /> : <Listings />}
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
  null
)(App);
