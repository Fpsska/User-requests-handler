import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchUsersData } from '../api/fetchUsersData';

import { generateRandomDate } from '../../helpers/getRandomDate';
import { getRandomStatus } from '../../helpers/getRandomStatus';

import { tableDataTypes, tableHeadTemplateTypes } from '../../Types/tableSliceTypes';

// /. imports

interface tableSliceTypes {
    isMainPage: boolean,
    isUsersDataEmpty: boolean,
    fetchUsersErrMsg: string,
    requestСount: number
    isTableDataLoading: boolean,
    status: string,
    filteredTableData: tableDataTypes[],
    tableData: tableDataTypes[],
    tableHeadTemplate: tableHeadTemplateTypes[]
}

// /. interfaces

const initialState: tableSliceTypes = {
    isMainPage: true,
    isUsersDataEmpty: false,
    fetchUsersErrMsg: '',
    requestСount: 0,
    isTableDataLoading: true,
    status: '',
    filteredTableData: [],
    tableData: [],
    tableHeadTemplate: [
        {
            id: 1,
            name: 'id',
            text: 'ID'
        },
        {
            id: 2,
            name: 'fio',
            text: 'ФИО'
        },
        {
            id: 3,
            name: 'birth',
            text: 'Дата рождения'
        },
        {
            id: 5,
            name: 'phone',
            text: 'Телефон'
        },
        {
            id: 6,
            name: 'filial',
            text: 'Филиал'
        },
        {
            id: 7,
            name: 'isPaid',
            text: 'Оплата'
        },
        {
            id: 8,
            name: 'status',
            text: 'Статус'
        }
    ]
};

// /. initialState

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {
        switchMainPageStatus(state, action: PayloadAction<boolean>) {
            state.isMainPage = action.payload;
        },
        switchTableDataLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isTableDataLoading = action.payload;
        },
        swithUsersDataEmptyStatus(state, action: PayloadAction<boolean>) {
            state.isUsersDataEmpty = action.payload;
        },
        setRequestCount(state, action: PayloadAction<number>) {
            state.requestСount = action.payload;
        },
        sortUsersByASC(state, action: PayloadAction<string>) {  // SECOND
            switch (action.payload) {
                case 'id':
                    state.tableData = state.tableData.sort((a, b) => a.id - b.id);
                    break;
                case 'fio':
                    state.tableData = state.tableData.sort((a, b) => a.name > b.name ? 1 : -1);
                    break;
                case 'birth':
                    state.tableData = state.tableData.sort((a, b) => (+a.birth.slice(6)) - (+b.birth.slice(6)));
                    break;
                case 'phone':
                    state.tableData = state.tableData.sort((a, b) => a.phone > b.phone ? 1 : -1);
                    break;
                case 'filial':
                    state.tableData = state.tableData.sort((a, b) => (+a.filial.replace(/\D/gi, '')) - (+b.filial.replace(/\D/gi, '')));
                    break;
                case 'isPaid':
                    state.tableData = state.tableData.sort((a, b) => (+a.isPaid) - (+b.isPaid));
                    break;
                case 'status':
                    state.tableData = state.tableData.sort((a, b) => a.status > b.status ? 1 : -1);
                    break;
            }
        },
        sortUsersByDSC(state, action: PayloadAction<string>) { // FIRST
            switch (action.payload) {
                case 'id':
                    state.tableData = state.tableData.sort((a, b) => b.id - a.id);
                    break;
                case 'fio':
                    state.tableData = state.tableData.sort((a, b) => a.name < b.name ? 1 : -1);
                    break;
                case 'birth':
                    state.tableData = state.tableData.sort((a, b) => (+b.birth.slice(6)) - (+a.birth.slice(6)));
                    break;
                case 'phone':
                    state.tableData = state.tableData.sort((a, b) => a.phone < b.phone ? 1 : -1);
                    break;
                case 'filial':
                    state.tableData = state.tableData.sort((a, b) => (+b.filial.replace(/\D/gi, '')) - (+a.filial.replace(/\D/gi, '')));
                    break;
                case 'isPaid':
                    state.tableData = state.tableData.sort((a, b) => (+b.isPaid) - (+a.isPaid));
                    break;
                case 'status':
                    state.tableData = state.tableData.sort((a, b) => a.status < b.status ? 1 : -1);
                    break;
            }
        },
        filterUsers(state, action: PayloadAction<{ name: string, value: string }>) {
            const { name, value } = action.payload;
            switch (name) {
                case 'ID':
                    state.tableData = state.filteredTableData.filter(item => RegExp(value, 'g').test(String(item.id)));
                    break;
                case 'FIO':
                    state.tableData = state.filteredTableData.filter(item => RegExp(value, 'gi').test(item.name));
                    break;
                case 'BIRTH':
                    state.tableData = state.filteredTableData.filter(item => RegExp(value, 'g').test(item.birth));
                    break;
                case 'PHONE':
                    state.tableData = state.filteredTableData.filter(item => RegExp(value, 'g').test((item.phone).replace(/[)(x\s]/g, '')));
                    break;
                case 'FILIAL':
                    state.tableData = state.filteredTableData.filter(item => {
                        if (item.filial === value) {
                            return item;
                        } else if (value === 'Филиал') {
                            return state.tableData;
                        }
                    });
                    break;
                case 'PAY':
                    state.tableData = state.filteredTableData.filter(item => {
                        if (item.isPaid === true && value === 'оплачено') {
                            return item;
                        } else if (item.isPaid === false && value === 'не оплачено') {
                            return item;
                        } else if (value === 'Оплата') {
                            return state.tableData;
                        }
                    });
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
            action: PayloadAction<tableDataTypes[]>
        ) => {
            state.tableData = action.payload;
            state.tableData.map(item => {
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
            state.requestСount = state.tableData.length;
            state.filteredTableData = action.payload;
        },
        [fetchUsersData.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.fetchUsersErrMsg = action.payload;
        }
    }
});

export const {
    switchMainPageStatus,
    switchTableDataLoadingStatus,
    swithUsersDataEmptyStatus,
    setRequestCount,
    sortUsersByASC,
    sortUsersByDSC,
    filterUsers
} = tableSlice.actions;

export default tableSlice.reducer;