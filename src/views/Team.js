import React, { useState, useEffect } from 'react';
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
        <h1 key={player.name}> {player.name}</h1>
      ))}
    </div>
  );
}
