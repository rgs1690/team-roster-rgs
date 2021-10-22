import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Players from '../components/Players';

const TitleStyle = styled.div`
  h1 {
    color: white;
    margin-bottom: 50px;
    margin-left: 120px;
    font-size: 70px;
  }
`;
export default function Team({
  players, setPlayers, setEditItem, user,
}) {
  return (
    <>
      <TitleStyle>
        <h1>THE TEAM</h1>
      </TitleStyle>
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
