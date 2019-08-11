import { useState, useContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { AppContext } from '../store/app';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [message, setMessage] = useState('');

  const [, setState] = useContext(AppContext);

  function clearForm() {
    setEmail('');
    setPassword('');
    setOrganisation('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Create the user
    const { data: userData } = await axios({
      method: 'post',
      url: '/api/users/new',
      data: {
        email,
        password,
      },
    });

    if (userData.error) {
      return setMessage(userData.message);
    }

    const { user, token } = userData;

    // Create the organisation and add the user to it
    await axios({
      method: 'post',
      url: '/api/organisations/new',
      data: {
        organisation,
        userIds: [user.id],
      },
    });

    // TODO: If there was an error creating the organisation, delete the user, so we don't end up with orphan users.

    clearForm();

    cookie.set('token', token, { expires: 365 });
    setState(oldState => ({ ...oldState, user }));
  }

  return (
    <div className="Signup">
      <h3>Sign up to Timezo</h3>
      {message && message.length && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
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

        <div className="field">
          <label htmlFor="organisation">Organisation Name</label>
          <input
            type="text"
            id="organisation"
            name="organisation"
            value={organisation}
            onChange={e => setOrganisation(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
