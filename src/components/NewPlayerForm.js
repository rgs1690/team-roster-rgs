import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllPlayers, createPlayer } from '../api/data/playersData';

const initialState = {
  imageUrl: '',
  name: '',
  position: '',
};
export default function NewPlayerForm({
  obj = {},
  players,
  setPlayers,
  setEditItem,
}) {
  const [formInput, setFormInput] = useState({
    name: obj.name || '',
    imageUrl: obj.imageUrl || '',
    position: obj.position || '',
  });
  useEffect(() => {
    let isMounted = true;
    getAllPlayers().then((playerArray) => {
      if (isMounted) setPlayers(playerArray);
    });
    return () => {
      isMounted = false;
    };
  }, [players]);
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
    createPlayer(formInput).then((playersArray) => {
      setPlayers(playersArray);
      resetForm();
    });
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
            SUBMIT
          </button>
        </span>
      </form>
    </>
  );
}
NewPlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }),
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
NewPlayerForm.defaultProps = { obj: {} };
