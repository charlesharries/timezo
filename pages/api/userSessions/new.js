import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usersDb } from '../../../db/adapters';

export default async function signin(req, res) {
  const { username, password } = req.body;

  // 1. Get the user by
  const user = usersDb
    .get('users')
    .find({ username })
    .value();

  if (!user || !Object.keys(user).length) {
    return res.json({ error: true, message: 'User does not exist.' });
  }

  // 2. Check if the passwords match
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.json({ error: true, message: 'Sike das the wrong password' });
  }

  // 3. If they match, return the user and a token
  const token = await jwt.sign({ id: user.id }, 'thisisasecret');

  return res.json({ error: false, token, user });
}
