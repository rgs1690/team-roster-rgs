import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewPlayerForm from '../components/NewPlayerForm';
import Team from '../views/Team';

export default function Routes({
  players, setPlayers, setEditItem, user,
}) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Team user={user} />} />
        <Route exact path="/team" component={() => <Team user={user} />} />
        <Route
          exact
          path="/new"
          component={() => (
            <NewPlayerForm
              players={players}
              setPlayers={setPlayers}
              setEditItem={setEditItem}
              user={user}
            />
          )}
        />
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
