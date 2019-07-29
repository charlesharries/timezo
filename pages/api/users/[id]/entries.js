import { entriesDb } from '../../../../db/adapters';

export default function userEntries(req, res) {
  const { id } = req.query;

  const entries = entriesDb.get('entries').find({ userId: id });

  console.log(entries);

  res.json({ error: false });
}
