import React, { createContext, useState, useContext } from 'react';

const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const toggleUpdate = () => {
    setShouldUpdate(prev => !prev);
  };

  return (
    <UpdateContext.Provider value={{ shouldUpdate, toggleUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => useContext(UpdateContext);
