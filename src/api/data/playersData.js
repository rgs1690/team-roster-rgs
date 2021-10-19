import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getAllPlayers = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/players.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createPlayer = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/todos.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/todos/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getAllPlayers().then(resolve);
        });
    })
    .catch(reject);
});

export { getAllPlayers, createPlayer };
