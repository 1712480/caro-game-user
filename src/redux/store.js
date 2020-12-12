import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import currentMatchReducer from './currentMatch';

const reducers = combineReducers({
  currentUser: userReducer,
  match: currentMatchReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['currentUser'],
  blacklist: ['match'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
