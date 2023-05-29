import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tableHeadData } from 'context/db';

import { makeDateCompare } from 'utils/helpers/makeDateCompare';

import { fetchUsersData } from '../api/fetchUsersData';

import { generateRandomDate } from '../../utils/helpers/getRandomDate';
import { getRandomArrayEl } from '../../utils/helpers/getRandomArrayEl';

import { ItableSlice } from '../../types/tableSliceTypes';

// /. imports

export const initialState: ItableSlice = {
    isUsersDataEmpty: false,
    fetchUsersStatus: '',
    fetchUsersErrMsg: '',
    requestСount: 0,
    isTableDataLoading: true,
    tableData: [],
    filteredTableData: [],
    tableHeadTemplates: tableHeadData
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
        setRequestCount(state, action: PayloadAction<number>) {
            state.requestСount = action.payload;
        },
        sortUsersByASC(state, action: PayloadAction<{ sortOpt: string }>) {
            // 1..10 or A..Z
            const { sortOpt } = action.payload;
            // /. payload
            switch (sortOpt) {
                case 'id':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => a.id - b.id
                    );
                    break;
                case 'fio':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => a.name.localeCompare(b.name)
                    );
                    break;
                case 'birth':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => makeDateCompare(a.birth, b.birth)
                    );
                    break;
                case 'phone':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) =>
                            +a.phone.replace(/\D/gi, '') -
                            +b.phone.replace(/\D/gi, '')
                    );
                    break;
                case 'filial':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) =>
                            +a.filial.replace(/\D/gi, '') -
                            +b.filial.replace(/\D/gi, '')
                    );
                    break;
                case 'isPaid':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => +a.isPaid - +b.isPaid
                    );
                    break;
                case 'status':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => a.status.localeCompare(b.status)
                    );
                    break;
                default:
                    return;
            }
        },
        sortUsersByDSC(state, action: PayloadAction<{ sortOpt: string }>) {
            // 10..1 or Z..A
            const { sortOpt } = action.payload;
            // /. payload
            switch (sortOpt) {
                case 'id':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => b.id - a.id
                    );
                    break;
                case 'fio':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => b.name.localeCompare(a.name)
                    );
                    break;
                case 'birth':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => makeDateCompare(b.birth, a.birth)
                    );
                    break;
                case 'phone':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) =>
                            +b.phone.replace(/\D/gi, '') -
                            +a.phone.replace(/\D/gi, '')
                    );
                    break;
                case 'filial':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) =>
                            +b.filial.replace(/\D/gi, '') -
                            +a.filial.replace(/\D/gi, '')
                    );
                    break;
                case 'isPaid':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => +b.isPaid - +a.isPaid
                    );
                    break;
                case 'status':
                    state.filteredTableData = [...state.filteredTableData].sort(
                        (a, b) => b.status.localeCompare(a.status)
                    );
                    break;
                default:
                    return;
            }
        },
        filterUsers(
            state,
            action: PayloadAction<{ filterProp: string; value: string }>
        ) {
            const { filterProp, value } = action.payload;
            // /. payload
            switch (filterProp) {
                case 'ID': {
                    const filteredData = state.tableData.filter(item =>
                        RegExp(value, 'g').test(String(item.id))
                    );
                    state.filteredTableData = value
                        ? filteredData
                        : [...state.tableData];
                    break;
                }
                case 'FIO':
                    state.filteredTableData = state.tableData.filter(item =>
                        RegExp(value, 'gi').test(item.name)
                    );
                    break;
                case 'BIRTH':
                    state.filteredTableData = state.tableData.filter(item =>
                        RegExp(value, 'g').test(item.birth)
                    );
                    break;
                case 'PHONE':
                    state.filteredTableData = state.tableData.filter(item =>
                        RegExp(value, 'g').test(
                            item.phone.replace(/[)(x\s]/g, '')
                        )
                    );
                    break;
                case 'FILIAL':
                case 'PAY':
                    state.filteredTableData = state.tableData.filter(item => {
                        if (
                            item.filial === value ||
                            (!item.isPaid && value === 'не оплачено') ||
                            (item.isPaid && value === 'оплачено')
                        ) {
                            return item;
                        } else if (value === 'Филиал' || value === 'Оплата') {
                            return state.tableData;
                        }
                    });
                    break;
                default:
                    state.filteredTableData = state.tableData;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsersData.pending, state => {
                state.fetchUsersStatus = 'loading';
                state.fetchUsersErrMsg = null;
            })
            .addCase(fetchUsersData.fulfilled, (state, action) => {
                state.tableData = action.payload;
                state.tableData.map(item => {
                    item.birth = `${generateRandomDate(
                        new Date(2012, 0, 1),
                        new Date()
                    ).toLocaleDateString('en-GB')}`;
                    item.filial = `${getRandomArrayEl([
                        'Филиал №1',
                        'Филиал №2'
                    ])}`;
                    item.isPaid = Boolean(Math.round(Math.random()));
                    item.status = `${getRandomArrayEl([
                        'В обработке',
                        'Новая',
                        'Закрыта'
                    ])}`;
                });
                state.fetchUsersStatus = 'success';
                state.requestСount = state.tableData.length;
                state.filteredTableData = action.payload;
            })
            .addCase(fetchUsersData.rejected, (state, action) => {
                state.fetchUsersStatus = 'failed';
                if (action.payload) {
                    state.fetchUsersErrMsg = action.payload;
                }
            });
    }
});

// /. slice

export const {
    switchTableDataLoadingStatus,
    swithUsersDataEmptyStatus,
    setRequestCount,
    sortUsersByASC,
    sortUsersByDSC,
    filterUsers
} = tableSlice.actions;

export default tableSlice.reducer;
