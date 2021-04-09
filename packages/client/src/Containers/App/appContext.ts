import React from 'react';
import { ContextI } from './types';

const AppContext = React.createContext<ContextI>({
  redirectTo: () => {
    /* no ops */
  },
  token: '',
});

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export default AppContext;
