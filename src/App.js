import React from 'react';
import './style/base.css';
import './style/reset.css';

import Login from './routes/Login';
import Deposit from './routes/Deposit';
import Home from './routes/Home';
import Inventory from './routes/Inventory';
import Register from "./routes/Register";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/deposit" component={Deposit} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
