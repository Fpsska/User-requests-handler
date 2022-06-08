import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import formSlice from './slices/formSlice';
import tableSlice from './slices/tableSlice';

// /. imports

export const store = configureStore({
  reducer: {
    formSlice: formSlice,
    tableSlice: tableSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
