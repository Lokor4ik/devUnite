﻿
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from 'pages/Landing/Landing';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import Dashboard from 'pages/Dashboard/Dashboard';
import CreateProfile from 'components/profile-forms/CreateProfile';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/create-profile' component={CreateProfile} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }

  return (
    <>
      <Route exact path='/' component={Landing} />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};