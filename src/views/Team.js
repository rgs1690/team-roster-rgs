import React from 'react';
import PropTypes from 'prop-types';
import Players from '../components/Players';

export default function Team({ players, setPlayers, setEditItem }) {
  return (
    <>
      <h1>TEAM</h1>
      {players.map((player) => (
        <Players
          key={player.firebaseKey}
          player={player}
          setEditItem={setEditItem}
          setPlayers={setPlayers}
        />
      ))}
    </>
  );
}
Team.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
