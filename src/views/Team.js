import React, { useState, useEffect } from 'react';
import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';
import { getAllPlayers } from '../api/data/playersData';

export default function Team() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    let isMounted = true;
    getAllPlayers().then((playerArray) => {
      if (isMounted) setPlayers(playerArray);
    });
    return () => {
      isMounted = false;
    };
  }, [players]);
  return (
    <div>
      {players.map((player) => (
        <div>
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
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
}
