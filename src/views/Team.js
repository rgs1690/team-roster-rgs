import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { getAllPlayers } from '../api/data/playersData';

export default function Team({ user }) {
  const [players, setPlayers] = useState([]);
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
      {players.map((player) => (
        <div key={player.firebaseKey}>
          <Card>
            <CardImg
              top
              width="75%"
              src={player.imageUrl}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">{player.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {player.position}
              </CardSubtitle>
              <Button color="primary">Edit</Button>
              <Button color="danger">Delete</Button>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
}
Team.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
