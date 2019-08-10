import { useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './Context';
import { deleteEntry } from '../controllers/EntryController';

function Entries() {
  const [state, setState] = useContext(AppContext);

  const { user, entries } = state;

  const fetchData = useCallback(async () => {
    const { data } = await axios({
      method: 'get',
      url: `/api/users/${user.id}/entries`,
    });

    setState(oldState => ({ ...oldState, entries: data.entries }));
  }, [setState, user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleDelete(id) {
    try {
      const deletedEntry = await deleteEntry({ id, userId: user.id });

      const newEntries = entries.filter(entry => entry.id !== deletedEntry.id);

      setState(oldState => ({ ...oldState, entries: newEntries }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ul>
      {Array.isArray(entries)
        ? entries.map(entry => (
            <li key={entry.id}>
              {entry.title}{' '}
              <button type="button" onClick={() => handleDelete(entry.id)}>
                Delete
              </button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default Entries;
