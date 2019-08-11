import { useContext } from 'react';
import { AppContext } from '../store/app';
import TheDashboard from '../components/TheDashboard';
import Entries from '../components/Entries';
import Signup from '../components/Signup';
import Timer from '../components/Timer';

function Home() {
  const [state] = useContext(AppContext);

  const { user } = state;

  return (
    <div className="Home">
      {user && user.email ? (
        <>
          <Timer />
          <Entries />
          <TheDashboard />
        </>
      ) : (
        <>
          <Signup />
        </>
      )}
    </div>
  );
}

export default Home;
