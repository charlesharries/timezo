import cookie from 'js-cookie';

function Signout({ setUser }) {
  function handleSignout() {
    cookie.remove('token');
    setUser({});
  }

  return (
    <button type="button" onClick={handleSignout}>
      Sign out
    </button>
  );
}

export default Signout;
