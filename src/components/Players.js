import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';
import { deletePlayer, getAllPlayers } from '../api/data/playersData';

const PlayersStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  flex-wrap: wrap;
  img {
    width: 700px;
    height: 600px;
    object-fit: cover;
  }
  button {
    margin: 10px;
    width: 150px;
    height: 50px;
  }
`;
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Players({
  player, setPlayers, setEditItem, user,
}) {
  const history = useHistory();

  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player.firebaseKey, player.uid).then((playerArray) => {
        setPlayers(playerArray);
      });
    } else if (method === 'update') {
      setEditItem(player);
      history.push('/New');
    }
  };
  useEffect(() => {
    let isMounted = true;
    getAllPlayers(user.uid).then((playerArray) => {
      if (isMounted) setPlayers(playerArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  // const cardStyle = {
  //   backgroundColor: 'yellow',
  //   marginBottom: '25px;',
  // };

  return (
    <>
      <PlayersStyle>
        <div className="playerCard">
          <Card style={{ marginBottom: '20px' }}>
            <CardImg
              top
              width="25%"
              src={player.imageUrl}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle style={{ textAlign: 'center' }} tag="h5">
                {player.name}
              </CardTitle>
              <CardSubtitle
                style={{ textAlign: 'center' }}
                tag="h6"
                className="mb-2 text-muted"
              >
                {player.position}
              </CardSubtitle>
              <ButtonStyle>
                <button
                  type="button"
                  className="btn btn-primary"
                  color="primary"
                  onClick={() => handleClick('update')}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleClick('delete')}
                  color="danger"
                >
                  Delete
                </button>
              </ButtonStyle>
            </CardBody>
          </Card>
        </div>
      </PlayersStyle>
    </>
  );
}
Players.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  //   players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
Players.defaultProps = { setEditItem: () => {} };
