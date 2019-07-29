import shortid from 'shortid';
import { entriesDb } from '../../../db/adapters';

export default function newEntry(req, res) {
  const { userId, title } = req.body;

  if (!userId) {
    return res.json({
      error: true,
      message: 'Please log in to create an entry',
    });
  }

  if (!title || !title.length) {
    return res.json({
      error: true,
      message: 'Please enter a title for this entry',
    });
  }

  try {
    const entry = entriesDb
      .get('entries')
      .push({
        id: shortid.generate(),
        userId,
        title,
      })
      .last()
      .write();

    return res.json({ error: false, entry });
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
}
