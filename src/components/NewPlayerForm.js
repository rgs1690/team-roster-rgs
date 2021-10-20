import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createPlayer, updatePlayer } from '../api/data/playersData';

const initialState = {
  imageUrl: '',
  name: '',
  position: '',
  uid: '',
};
export default function NewPlayerForm({
  player,
  setPlayers,
  setEditItem,
  user,
}) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();
  useEffect(() => {
    if (player.firebaseKey) {
      setFormInput({
        name: player.name,
        firebaseKey: player.firebaseKey,
        position: player.position,
        imageUrl: player.imageUrl,
        uid: player.uid,
      });
    }
  }, [player]);
  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const resetForm = () => {
    setFormInput({ ...initialState });
    setEditItem({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(formInput).then((players) => {
        setPlayers(players);
        resetForm();
      });
    } else {
      createPlayer({ ...formInput, uid: user.uid }).then(() => {
        resetForm();
        history.push('/team');
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <div className="input-group">
            <input
              className="form-control form-control-lg me-1"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </div>
        </label>
        <label htmlFor="imageUrl">
          <div className="input-group">
            <input
              className="form-control form-control-lg me-1"
              type="url"
              name="imageUrl"
              id="imageUrl"
              placeholder="Enter Image Url"
              value={formInput.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
        </label>
        <label htmlFor="position">
          <div className="input-group">
            <input
              className="form-control form-control-lg me-1"
              type="text"
              name="position"
              id="position"
              placeholder="Enter Position"
              value={formInput.position}
              onChange={handleChange}
              required
            />
          </div>
        </label>
        <span className="input-group-btn">
          <button className="btn btn-success submit" type="submit">
            {player.firebaseKey ? 'UPDATE' : 'SUBMIT'}
          </button>
        </span>
      </form>
    </>
  );
}
NewPlayerForm.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
