// context/menuContext.js
import { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
    <MenuContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
