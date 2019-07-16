import jwt from 'jsonwebtoken';
import { usersDb } from '../../../db/adapters';

export default function getUser(req, res) {
  const { id } = req.query;
  const { token } = req.cookies;

  const { id: idFromToken } = jwt.verify(token, 'thisisasecret');

  if (id !== idFromToken) {
    res.statusCode = 403;
    return res.json({ error: true, message: 'Not authorised.' });
  }

  const user = usersDb
    .get('users')
    .find({ id })
    .value();

  res.json({ user });
}
