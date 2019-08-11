import { useContext } from 'react';
import { AppContext } from '../store/app';
import Signout from './Signout';

function SigninStatus() {
  const [state] = useContext(AppContext);

  const { user } = state;

  return (
    <div className="SigninStatus">
      {user && Object.keys(user).length ? (
        <div className="SigninStatus__signedIn">
          <p className="SigninStatus signedInText">Signed in as {user.email}</p>
          <Signout />
        </div>
      ) : (
        <p className="SigninStatus__signedOut">Not signed in.</p>
      )}
    </div>
  );
}

export default SigninStatus;
