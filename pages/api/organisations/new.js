import shortid from 'shortid';
import slugify from 'slugify';
import { orgsDb } from '../../../db/adapters';

export default async function newOrganisation(req, res) {
  const { organisation: name, userIds } = req.body;

  // 1. Validate organisation name and userId

  // 2. Set organisation slug (if already exists, set another one)
  const slug = slugify(name).toLowerCase();

  try {
    // 3. Save the organisation
    const organisation = orgsDb
      .get('organisations')
      .push({ id: shortid.generate(), name, slug, userIds })
      .last()
      .write();

    // 4. Return the organisation
    return res.json(organisation);
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
}
