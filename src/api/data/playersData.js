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
const deletePlayer = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/players/${firebaseKey}.json`)
    .then(() => {
      getAllPlayers(uid).then(resolve);
    })
    .catch(reject);
});
const updatePlayer = (obj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/players/${obj.firebaseKey}.json`, obj)
    .then(() => getAllPlayers(obj.uid).then(resolve))
    .catch(reject);
});

export {
  getAllPlayers, createPlayer, deletePlayer, updatePlayer,
};
