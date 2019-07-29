import { useState, useEffect } from 'react';
import cookies from 'next-cookies';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Signout from '../components/Signout';
import Timer from '../components/Timer';

function Home({ token }) {
  const hasCookie = token && token.length > 0;

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { id } = jwt.verify(token, 'thisisasecret');

      const { data } = await axios({
        method: 'get',
        url: `/api/users/${id}`,
        withCredentials: true,
      });

      setUser(data.user);
    }

    if (hasCookie) fetchData();
  }, [hasCookie, token]);

  return (
    <div className="Home">
      {user && user.username ? (
        <>
          <p>Logged in as {user.username}</p>
          <Signout setUser={setUser} />
          <Timer user={user} />
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <Signup setUser={setUser} />
          <Signin setUser={setUser} />
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
