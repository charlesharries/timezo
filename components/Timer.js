import { useState, useContext } from 'react';
import { createEntry } from '../controllers/EntryController';
import { AppContext } from './Context';

function Timer() {
  const [title, setTitle] = useState('');
  const [state, setState] = useContext(AppContext);

  const { user } = state;

  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Save the entry to the database
    try {
      const entry = await createEntry({ title, userId: user.id });

      // 2. Add the entry to local context
      const entries = [...state.entries, entry];
      setState(oldState => ({ ...oldState, entries }));

      // 3. Clear the form
      setTitle('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Timer">
      <form onSubmit={handleSubmit} className="Timer__form">
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
