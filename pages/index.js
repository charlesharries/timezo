import { useEffect, useContext } from 'react';
import cookies from 'next-cookies';
import cookie from 'js-cookie';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { AppProvider, AppContext } from '../components/Context';
import Entries from '../components/Entries';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Signout from '../components/Signout';
import Timer from '../components/Timer';

function Home({ token }) {
  const hasCookie = token && token.length > 0;
  const [state, setState] = useContext(AppContext);

  const { user } = state;

  useEffect(() => {
    async function fetchData() {
      try {
        const { id } = jwt.verify(token, 'thisisasecret');

        const { data } = await axios({
          method: 'get',
          url: `/api/users/${id}`,
          withCredentials: true,
        });

        setState(oldState => ({ ...oldState, user: data.user }));
      } catch (err) {
        cookie.remove('token');
        setState(oldState => ({ ...oldState, user: null }));
      }
    }

    if (hasCookie) fetchData();
  }, [hasCookie, setState, state, token]);

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

Home.getInitialProps = async ctx => {
  const { token } = cookies(ctx);

  return { token };
};

export default Home;
