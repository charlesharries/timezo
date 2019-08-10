import { useContext } from 'react';
import { AppContext } from '../components/Context';
import Entries from '../components/Entries';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Signout from '../components/Signout';
import Timer from '../components/Timer';

function Home() {
  const [state] = useContext(AppContext);

  const { user } = state;

  return (
    <div className="Home">
      {user && user.username ? (
        <>
          <p>Logged in as {user.username}</p>
          <Signout />
          <Timer />
          <Entries />
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <Signup />
          <Signin />
        </>
      )}
    </div>
  );
}

export default Home;
