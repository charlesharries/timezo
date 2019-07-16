import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const usersAdapter = new FileSync('db/users.json');
const usersDb = low(usersAdapter);

usersDb.defaults({ users: [] }).write();

export { usersDb };
