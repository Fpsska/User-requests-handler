import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import formSlice from './slices/formSlice';
import tableSlice from './slices/tableSlice';
import postSilce from './slices/postSilce';

// /. imports

export const store = configureStore({
    reducer: {
        formSlice: formSlice,
        tableSlice: tableSlice,
        postSilce: postSilce
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
