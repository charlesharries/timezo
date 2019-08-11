import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../store/app';

function Organisation() {
  const [state] = useContext(AppContext);
  const [organisation, setOrganisation] = useState(null);

  const { user } = state;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios({
        method: 'get',
        url: `/api/organisations/me`,
        withCredentials: true,
      });

      console.log(data);

      setOrganisation(data);
    }

    fetchData();
  }, [user.id]);

  return organisation ? (
    <div className="Organisation">Organisation: {organisation.name}</div>
  ) : null;
}

export default Organisation;
