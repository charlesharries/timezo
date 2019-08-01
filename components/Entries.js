import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './Context';

function Entries({ user }) {
  const [state, setState] = useContext(AppContext);

  const { entries } = state;

  const fetchData = useCallback(async () => {
    const { data } = await axios({
      method: 'get',
      url: `/api/users/${user.id}/entries`,
    });

    setState(oldState => setState({ ...oldState, entries: data.entries }));
  }, [setState, user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ul>
      {Array.isArray(entries)
        ? entries.map(entry => <li key={entry.key}>{entry.title}</li>)
        : null}
    </ul>
  );
}

export default Entries;
