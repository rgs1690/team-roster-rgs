import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getAllPlayers = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createPlayer = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/players.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/players/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getAllPlayers(obj.uid).then(resolve);
        });
    })
    .catch(reject);
});

export { getAllPlayers, createPlayer };
