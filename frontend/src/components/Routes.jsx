import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import About from './About.jsx';
import Users from './Users.jsx';

const Routes = () => {
  return (
    <Router>
      <Navbar/>
      <div className="container p-4">
        <Switch>
          <Route path="/about" render={() => <About/>} />
          <Route path="/" render={() => <Users/> } />
        </Switch>
      </div>
    </Router>
  )
}

export default Routes
