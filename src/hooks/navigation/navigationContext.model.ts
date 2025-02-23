import { ReactNode } from 'react';

interface NavigationProviderProps {
  children: ReactNode;
}

interface NavigationContextType {
  navigateTo: (path: string) => void;
}

export type { NavigationProviderProps, NavigationContextType };
