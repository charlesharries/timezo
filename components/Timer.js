import { useState } from 'react';
import axios from 'axios';

function Timer({ user }) {
  const [title, setTitle] = useState('');

  async function createEntry(e) {
    e.preventDefault();

    const { data } = await axios({
      method: 'post',
      url: '/api/entries/new',
      data: {
        title,
        userId: user.id,
      },
    });

    console.log(data);
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
