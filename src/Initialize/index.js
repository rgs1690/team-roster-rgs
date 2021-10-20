import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import SignIn from '../views/SignIn';
import Navigation from '../components/Navigation';
import Routes from '../routes';
import { getAllPlayers } from '../api/data/playersData';

function Initialize() {
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getAllPlayers(userInfoObj.uid).then(setPlayers);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navigation />
          <Routes
            player={editItem}
            players={players}
            setPlayers={setPlayers}
            setEditItem={setEditItem}
            user={user}
          />
        </>
      ) : (
        <SignIn user={user} />
      )}
    </>
  );
}

export default Initialize;
