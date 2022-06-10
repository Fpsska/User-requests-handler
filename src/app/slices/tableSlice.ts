import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';

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
    isUsersDataEmpty: boolean,
    fetchUsersErrMsg: string,
    requestСount: number
    isTableDataLoading: boolean,
    status: string,
    tableTemplates: any[]       // tableTemplatesTypes
}

// /. interfaces

const initialState: tableSliceTypes = {
    isUsersDataEmpty: false,
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
        },
        swithUsersDataEmptyStatus(state, action: PayloadAction<boolean>) {
            state.isUsersDataEmpty = action.payload;
        },
        sortUsersByASC(state, action: PayloadAction<string>) {  // SECOND
            switch (action.payload) {
                case 'id':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.id - b.id);
                    break;
                case 'fio':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.name > b.name ? 1 : -1);
                    break;
                case 'birth':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => (+a.birth.slice(6)) - (+b.birth.slice(6)));
                    break;
                case 'phone':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.phone > b.phone ? 1 : -1);
                    break;
                case 'filial':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.filial > b.filial ? 1 : -1);
                    break;
                case 'isPaid':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.isPaid > b.isPaid ? 1 : -1);
                    break;
                case 'status':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.status > b.status ? 1 : -1);
                    break;
            }
        },
        sortUsersByDSC(state, action: PayloadAction<string>) { // FIRST
            switch (action.payload) {
                case 'id':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => b.id - a.id);
                    break;
                case 'fio':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.name < b.name ? 1 : -1);
                    break;
                case 'birth':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => (+b.birth.slice(6)) - (+a.birth.slice(6)));
                    break;
                case 'phone':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.phone < b.phone ? 1 : -1);
                    break;
                case 'filial':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.filial < b.filial ? 1 : -1);
                    break;
                case 'isPaid':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.isPaid < b.isPaid ? 1 : -1);
                    break;
                case 'status':
                    state.tableTemplates = state.tableTemplates.sort((a, b) => a.status < b.status ? 1 : -1);
                    break;
            }
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
    switchTableDataLoadingStatus,
    swithUsersDataEmptyStatus,
    sortUsersByASC,
    sortUsersByDSC
} = tableSlice.actions;

export default tableSlice.reducer;