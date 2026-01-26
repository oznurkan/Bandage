import { configureStore } from '@reduxjs/toolkit';
import dataInfoReducer from './slices/dataInfoSlice';

export const store = configureStore({
  reducer: {
    appData: dataInfoReducer, 
  },
});