import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { deletePlayer, getAllPlayers } from '../api/data/playersData';

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

  return (
    <div>
      <Card>
        <CardImg top width="25%" src={player.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{player.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {player.position}
          </CardSubtitle>
          <Button color="primary" onClick={() => handleClick('update')}>
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
  //   players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
Players.defaultProps = { setEditItem: () => {} };
