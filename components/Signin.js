import { useState, useContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { AppContext } from '../store/app';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
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

    if (data.error) {
      return setMessage(data.message);
    }

    const { user, token } = data;
    cookie.set('token', token, { expires: 365 });
    return setState(oldState => ({ ...oldState, user }));
  }

  return (
    <div className="Signin">
      <h3>Sign in</h3>
      {message && message.length && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signin;
