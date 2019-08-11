import { useState, useContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { AppContext } from '../store/app';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setState] = useContext(AppContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const { data } = await axios({
      method: 'post',
      url: '/api/userSessions/new',
      data: {
        username,
        password,
      },
    });

    const { user, token } = data;
    cookie.set('token', token, { expires: 365 });
    setState(oldState => ({ ...oldState, user }));
  }

  return (
    <div className="Signin">
      <h3>Sign in</h3>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
