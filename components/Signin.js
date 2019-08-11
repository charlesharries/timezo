import { useState, useContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { AppContext } from '../store/app';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setState] = useContext(AppContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const { data } = await axios({
      method: 'post',
      url: '/api/userSessions/new',
      data: {
        email,
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
      <p>email: {email}</p>
      <p>Password: {password}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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

export default Signin;
