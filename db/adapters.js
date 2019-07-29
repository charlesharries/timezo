import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const usersAdapter = new FileSync('db/users.json');
const usersDb = low(usersAdapter);

const entriesAdapter = new FileSync('db/entries.json');
const entriesDb = low(entriesAdapter);

usersDb.defaults({ users: [] }).write();
entriesDb.defaults({ entries: [] }).write();

export { usersDb, entriesDb };
