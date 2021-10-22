import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Team from '../views/Team';
import New from '../views/New';

export default function Routes({
  players,
  player,
  setPlayers,
  setEditItem,
  user,
}) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Team
            user={user}
            players={players}
            setPlayers={setPlayers}
            setEditItem={setEditItem}
          />
        </Route>

        <Route exact path="/new">
          <New
            players={players}
            player={player}
            setPlayers={setPlayers}
            setEditItem={setEditItem}
            user={user}
          />
        </Route>
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
