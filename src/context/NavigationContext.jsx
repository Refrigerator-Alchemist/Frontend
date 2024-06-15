import React, { createContext, useState } from 'react';

export const NavigationContext = createContext();
export const NavigationProvider = ({ children }) => {
  const [selected, setSelected] = useState('');
  return (
    <NavigationContext.Provider value={{ selected, setSelected }}>
      {children}
    </NavigationContext.Provider>
  );
};
