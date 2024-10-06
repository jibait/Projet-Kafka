import { createContext } from 'react';
import { Store } from '../store/Store';

export const StoreContext = createContext<Store>(null!);
export const StoreProvider = StoreContext.Provider;