import React from 'react';
import PropTypes from 'prop-types';
import Players from '../components/Players';

export default function Team({
  players, setPlayers, setEditItem, user,
}) {
  return (
    <>
      {players.map((player) => (
        <Players
          key={player.firebaseKey}
          players={players}
          player={player}
          setEditItem={setEditItem}
          setPlayers={setPlayers}
          user={user}
        />
      ))}
    </>
  );
}
Team.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};
Team.defaultProps = { user: {} };
