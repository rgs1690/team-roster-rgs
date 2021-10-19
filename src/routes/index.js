import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import New from '../views/New';
import Team from '../views/Team';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/new" component={New} />
      </Switch>
    </div>
  );
}
