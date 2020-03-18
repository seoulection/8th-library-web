import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { signIn, signOut } from './actions';
import { currentUser } from './api/UserAPI';
import Listings from './views/Listings';
import Login from './views/Login';

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
    console.log('hello');
    console.log(this.props.isSignedIn);
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
  { signIn, signOut }
)(App);
