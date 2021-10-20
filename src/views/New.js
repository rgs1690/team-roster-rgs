import React from 'react';
import PropTypes from 'prop-types';
import NewPlayerForm from '../components/NewPlayerForm';

export default function New({
  player, setPlayers, setEditItem, user,
}) {
  return (
    <>
      <h1> Add A Player</h1>
      <NewPlayerForm
        player={player}
        setPlayers={setPlayers}
        setEditItem={setEditItem}
        user={user}
      />
    </>
  );
}
New.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
New.defaultProps = { player: {} };
