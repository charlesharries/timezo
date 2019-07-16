import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import shortid from 'shortid';
import { usersDb } from '../../db/adapters';

export default async function signup(req, res) {
  let { username, password } = req.body;

  // 1. Format username and password
  username = username.toLowerCase();
  password = await bcrypt.hash(password, 10);

  // 2. Check if the user already exists
  const userExists = usersDb
    .get('users')
    .find({ username })
    .value();

  if (userExists) {
    return res.json({ error: true, message: 'User exists.' });
  }

  // 3. Save the user
  try {
    const user = usersDb
      .get('users')
      .push({ id: shortid.generate(), username, password })
      .last()
      .write();

    const token = await jwt.sign({ id: user.id }, 'thisisasecret');

    // 4. Return the user and token
    return res.json({ error: false, token, user });
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
}
