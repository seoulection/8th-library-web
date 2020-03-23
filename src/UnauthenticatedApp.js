import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Login from './views/Login';

function UnauthenticatedApp() {
  return (
    <div className="container-fluid">
      <Login />
      <Route render={() => <Redirect to="/" />} />
    </div>
  );
}

export default UnauthenticatedApp;
