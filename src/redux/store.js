import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';

const reducers = combineReducers({
  currentUser: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['currentUser'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
