import React from 'react';
import { UserDetailsI } from '../../utils/types';
import { ContextI } from './types';

const AppContext = React.createContext<ContextI>({
  redirectTo: () => {
    /* no ops */
  },
  token: '',
  loggedInUser: {} as UserDetailsI,
});

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export default AppContext;
