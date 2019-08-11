import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import { isEmail } from 'validator';
import { usersDb } from '../../../db/adapters';

export default async function signup(req, res) {
  let { email, password } = req.body;

  // 1. Format & validate email and password
  email = email.toLowerCase();

  if (!isEmail(email)) {
    return res.json({
      error: true,
      message: 'Improperly formed email address.',
    });
  }

  if (!password || password.length < 6) {
    return res.json({
      error: true,
      message: 'Your password must be at least 6 characters.',
    });
  }

  password = await bcrypt.hash(password, 10);

  // 2. Check if the user already exists
  const userExists = usersDb
    .get('users')
    .find({ email })
    .value();

  if (userExists) {
    return res.json({ error: true, message: 'User exists.' });
  }

  // 3. Save the user
  try {
    const user = usersDb
      .get('users')
      .push({ id: shortid.generate(), email, password })
      .last()
      .write();

    const token = await jwt.sign({ id: user.id }, 'thisisasecret');

    // 4. Return the user and token
    return res.json({ error: false, token, user });
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
}
