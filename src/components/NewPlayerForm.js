import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createPlayer, updatePlayer } from '../api/data/playersData';

const FormStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 75px;
  }
  .input-group {
    flex-shrink: 2;
    width: 50em;
    margin-bottom: 4em;
    margin-left: 30px;
  }
  button {
    height: 100px;
    width: 350px;
    font-size: 30px;
    margin-left: 150px;
  }
`;
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
    setEditItem({ initialState });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(formInput).then(setPlayers);
      // setPlayers(players);
      resetForm();
      history.push('/');
    } else {
      createPlayer({ ...formInput, uid: user.uid }).then((players) => {
        setPlayers(players);
        resetForm();
        history.push('/');
      });
    }
  };
  return (
    <>
      <FormStyle>
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
      </FormStyle>
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
