import { useState, useEffect } from 'react';
import cookies from 'next-cookies';
import cookie from 'js-cookie';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { AppProvider } from '../components/Context';
import Entries from '../components/Entries';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Signout from '../components/Signout';
import Timer from '../components/Timer';

function Home({ token }) {
  const hasCookie = token && token.length > 0;

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { id } = jwt.verify(token, 'thisisasecret');

        const { data } = await axios({
          method: 'get',
          url: `/api/users/${id}`,
          withCredentials: true,
        });

        setUser(data.user);
      } catch (err) {
        cookie.remove('token');
        setUser(null);
      }
    }

    if (hasCookie) fetchData();
  }, [hasCookie, token]);

  return (
    <AppProvider>
      <div className="Home">
        {user && user.username ? (
          <>
            <p>Logged in as {user.username}</p>
            <Signout setUser={setUser} />
            <Timer user={user} />
            <Entries user={user} />
          </>
        ) : (
          <>
            <p>Not logged in</p>
            <Signup setUser={setUser} />
            <Signin setUser={setUser} />
          </>
        )}
      </div>
    </AppProvider>
  );
}

Home.getInitialProps = async ctx => {
  const { token } = cookies(ctx);

  return { token };
};

export default Home;
