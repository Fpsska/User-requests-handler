import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { tableTemplatesTypes } from '../../Types/tableSliceTypes';

import { generateRandomDate } from '../../helpers/getRandomDate';
import { getRandomStatus } from '../../helpers/getRandomStatus';

// /. imports

export const fetchUsersData = createAsyncThunk(
    'tableSlice/fetchUsersData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error('Response: server error!');
            }

            const data = await response.json();
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// /. AsyncThunk

interface tableSliceTypes {
    fetchUsersErrMsg: string,
    requestСount: number
    isTableDataLoading: boolean,
    status: string,
    tableTemplates: tableTemplatesTypes[]
}

// /. interfaces

const initialState: tableSliceTypes = {
    fetchUsersErrMsg: '',
    requestСount: 0,
    isTableDataLoading: true,
    status: '',
    tableTemplates: []
};

// /. initialState

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {
        switchTableDataLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isTableDataLoading = action.payload;
        }
    },
    extraReducers: {
        [fetchUsersData.pending.type]: (state) => {
            state.status = 'loading';
        },
        [fetchUsersData.fulfilled.type]: (
            state,
            action: PayloadAction<tableTemplatesTypes[]>
        ) => {
            state.tableTemplates = action.payload;
            state.tableTemplates.map(item => {
                item.birth = `${generateRandomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString('en-GB')}`;
                item.filial = `${getRandomStatus([
                    'Филиал №1',
                    'Филиал №2'
                ])}`;
                item.isPaid = Boolean(Math.round(Math.random()));
                item.status = `${getRandomStatus([
                    'В обработке',
                    'Новая',
                    'Закрыта'
                ])}`;
            });
            state.status = 'success';
            state.requestСount = state.tableTemplates.length;
        },
        [fetchUsersData.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.fetchUsersErrMsg = action.payload;
        }
    }
});

export const {
    switchTableDataLoadingStatus
} = tableSlice.actions;

export default tableSlice.reducer;