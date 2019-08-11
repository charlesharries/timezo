import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

/* Organisations database */
const orgsAdapter = new FileSync('db/orgs.json');
const orgsDb = low(orgsAdapter);
orgsDb.defaults({ organisations: [] }).write();

/* Users database */
const usersAdapter = new FileSync('db/users.json');
const usersDb = low(usersAdapter);
usersDb.defaults({ users: [] }).write();

/* Entries database */
const entriesAdapter = new FileSync('db/entries.json');
const entriesDb = low(entriesAdapter);
entriesDb.defaults({ entries: [] }).write();

export { usersDb, entriesDb, orgsDb };
