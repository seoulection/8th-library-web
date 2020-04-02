import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Login from './views/Login';

function UnauthenticatedApp() {
  return (
    <div className="container-fluid h-100">
      <Login />
      <Route render={() => <Redirect to="/" />} />
    </div>
  );
}

export default UnauthenticatedApp;
