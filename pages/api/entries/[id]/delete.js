import { entriesDb } from '../../../../db/adapters';

export default function deleteEntry(req, res) {
  const { id } = req.query;

  try {
    // 1. Find the entry
    const [entry] = entriesDb
      .get('entries')
      .remove({ id })
      .write();

    // 2. TODO: Check that the user owns this entry

    // 3. Delete the entry

    // 4. Return success
    return res.json({ error: false, entry });
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
}
