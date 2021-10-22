import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import { signOutUser } from '../api/auth';

const NavigationStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: right;

  button {
    margin: 10px;
    width: 200px;
    height: 100px;
    color: navy;
    border: solid 9px white;
  }
`;
export default function Navigation() {
  const history = useHistory();

  return (
    <NavigationStyle>
      <div className="text-center mb-3">
        <ButtonGroup size="lg">
          <button
            onClick={() => history.push('/')}
            type="button"
            className="btn btn-warning"
          >
            Team
          </button>
          <button
            onClick={() => history.push('/new')}
            type="button"
            className="btn btn-info"
          >
            Add Player
          </button>
          <button
            onClick={signOutUser}
            type="button"
            className="btn btn-danger"
          >
            LogOut
          </button>
        </ButtonGroup>
      </div>
    </NavigationStyle>
  );
}
