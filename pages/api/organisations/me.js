import jwt from 'jsonwebtoken';
import { orgsDb } from '../../../db/adapters';

export default function getUserOrganisation(req, res) {
  const { token } = req.cookies;

  if (!token || !token.length) {
    return res.json({ error: true, message: 'Not logged in.' });
  }

  try {
    const { id } = jwt.verify(token, 'thisisasecret');

    const organisation = orgsDb
      .get('organisations')
      .find(org => org.userIds.includes(id))
      .value();

    return res.json(organisation);
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
}
