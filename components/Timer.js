import { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './Context';

function Timer() {
  const [title, setTitle] = useState('');
  const [state, setState] = useContext(AppContext);

  const { user } = state;

  async function createEntry(e) {
    e.preventDefault();

    // 1. Save the entry to the database
    const { data } = await axios({
      method: 'post',
      url: '/api/entries/new',
      data: {
        title,
        userId: user.id,
      },
    });

    // 2. Add the entry to local context
    const entries = [...state.entries, data.entry];
    setState(oldState => ({ ...oldState, entries }));

    // 3. Clear the form
    setTitle('');
  }

  return (
    <div className="Timer">
      <form onSubmit={createEntry} className="Timer__form">
        <label htmlFor="EntryNotes">Entry name</label>
        <input
          type="text"
          name="EntryNotes"
          id="EntryNotes"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Timer;
