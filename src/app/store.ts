import {
    combineReducers,
    configureStore,
    ThunkAction,
    Action
} from '@reduxjs/toolkit';

import formSlice from './slices/formSlice';
import tableSlice from './slices/tableSlice';
import postSlice from './slices/postSlice';

import type { PreloadedState } from '@reduxjs/toolkit';

// /. imports

const rootReducer = combineReducers({
    formSlice: formSlice,
    tableSlice: tableSlice,
    postSlice: postSlice
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
