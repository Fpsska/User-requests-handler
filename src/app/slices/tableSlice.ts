import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { tableTemplatesTypes } from '../../Types/tableSliceTypes';

import { generateRandomDate } from '../../helpers/getRandomDate';



// [
//     'В обработке',
//     'Новая',
//     'Закрыта'
// ]

// /. imports

export const fetchUsersData = createAsyncThunk(
    'tableSlice/fetchUsersData',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        const result = data;
        return result;
    }
);

// /. AsyncThunk

interface tableSliceTypes {
    status: string,
    tableTemplates: tableTemplatesTypes[]
}

// /. interfaces

const initialState: tableSliceTypes = {
    status: '',
    tableTemplates: []
};

// /. initialState

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {},
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
                item.filial = 'Филиал №1';
                item.isPaid = Boolean(Math.round(Math.random()));
                item.status = 'В обработке';
            });
            state.status = 'success';
        },
        [fetchUsersData.rejected.type]: (state) => {
            state.status = 'failed';
        }
    }
});

export const { } = tableSlice.actions;

export default tableSlice.reducer;