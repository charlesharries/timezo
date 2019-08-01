import { entriesDb } from '../../../../db/adapters';

export default function userEntries(req, res) {
  const { id } = req.query;

  const entries = entriesDb.get('entries').filter({ userId: id });

  res.json({ error: false, entries });
}
