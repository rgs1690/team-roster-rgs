import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createPlayer } from '../api/data/playersData';

const initialState = {
  imageUrl: '',
  name: '',
  position: '',
};
export default function NewPlayerForm({ obj }) {
  const [formInput, setFormInput] = useState({
    name: obj.name || '',
    imageUrl: obj.imageUrl || '',
    position: obj.position || '',
  });
  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //   useEffect(() => {
  //     if (obj.firebaseKey) {
  //       setFormInput({
  //         name: obj.name,
  //         firebaseKey: obj.firebaseKey,
  //         imageUrl: obj.imageUrl,
  //         position: obj.position,
  //         uid: obj.uid,
  //       });
  //     }
  //   }, [obj]);
  const resetForm = () => {
    setFormInput({ ...initialState });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createPlayer(formInput).then(() => {
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
  //   setPlayers: PropTypes.func.isRequired,
  //   setEditItem: PropTypes.func.isRequired,
};
NewPlayerForm.defaultProps = { obj: {} };
