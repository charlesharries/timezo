import { useContext } from 'react';
import cookie from 'js-cookie';
import { AppContext } from '../store/app';

function Signout() {
  const [, setState] = useContext(AppContext);

  function handleSignout() {
    cookie.remove('token');
    setState(oldState => ({ ...oldState, user: {} }));
  }

  return (
    <button type="button" onClick={handleSignout}>
      Sign out
    </button>
  );
}

export default Signout;
