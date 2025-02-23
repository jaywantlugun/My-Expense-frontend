import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavigationProviderProps,
  NavigationContextType,
} from './navigationContext.model';

const NavigationContext = createContext<NavigationContextType | null>(null);

const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  // Navigation function that can be used outside components
  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to use navigation context
const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('Error in api call');
  }

  return context;
};

export { useNavigation, NavigationProvider };
