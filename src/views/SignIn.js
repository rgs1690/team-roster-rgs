import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { signInUser } from '../api/auth';

const TitleStyle = styled.div`
  h1 {
    color: white;
    margin-top: 0px;
    margin-bottom: 50px;
    text-align: center;
    font-size: 30px;
  }
  button {
    margin-top: 0px;
    width: 200px;
    height: 90px;
    font-size: 25px;
  }
`;
export default function SignIn({ user }) {
  return (
    <>
      <TitleStyle>
        {user === null ? (
          'Loading...'
        ) : (
          <div className="text-center mt-5">
            <h1>Welcome! Sign In!</h1>
            <button
              type="button"
              className="btn btn-success"
              onClick={signInUser}
            >
              Sign In
            </button>
          </div>
        )}
      </TitleStyle>
    </>
  );
}
SignIn.propTypes = {
  user: PropTypes.node,
};
SignIn.defaultProps = {
  user: null,
};
// add loading instance for when user is null
