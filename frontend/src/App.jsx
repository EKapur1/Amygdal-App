import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Category from './components/layout/Category';

import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path='/' component={Landing} />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/categories' component={Category} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
