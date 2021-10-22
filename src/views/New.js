import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NewPlayerForm from '../components/NewPlayerForm';

const TitleStyle = styled.div`
  h1 {
    color: white;
    margin-bottom: 50px;
    margin-left: 100px;
    font-size: 70px;
  }
`;
export default function New({
  player, setPlayers, setEditItem, user,
}) {
  return (
    <>
      <TitleStyle>
        <h1> Add A Player</h1>
      </TitleStyle>
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
