import React, { useState } from 'react';

const AppContext = React.createContext([{}, () => {}]);

function AppProvider({ children }) {
  const [state, setState] = useState({
    user: {},
    entries: [],
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
