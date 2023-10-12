import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(0);

  const updateId = (newId) => {
    setId(newId);
  };

  return (
    <UserContext.Provider value={{ id, updateId }}>
      {children}
    </UserContext.Provider>
  );
};
