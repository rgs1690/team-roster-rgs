import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { deletePlayer, updatePlayer } from '../api/data/playersData';

export default function Players({ player, setPlayers, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player.firebaseKey).then(setPlayers);
    } else {
      updatePlayer(player).then(setPlayers);
    }
  };

  return (
    <div>
      <Card>
        <CardImg top width="75%" src={player.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{player.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {player.position}
          </CardSubtitle>
          <Button color="primary" onClick={() => setEditItem(player)}>
            Edit
          </Button>
          <Button onClick={() => handleClick('delete')} color="danger">
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
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
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func,
};
Players.defaultProps = { setEditItem: () => {} };
