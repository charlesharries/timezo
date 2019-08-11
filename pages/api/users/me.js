import jwt from 'jsonwebtoken';
import { usersDb } from '../../../db/adapters';

export default async function me(req, res) {
  const { token } = req.cookies;

  if (!token || !token.length) {
    return res.json({ error: true, message: 'Not logged in.' });
  }

  try {
    const { id } = jwt.verify(token, 'thisisasecret');

    const user = usersDb
      .get('users')
      .find({ id })
      .value();

    return res.json(user);
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
}
