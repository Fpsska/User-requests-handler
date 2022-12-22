import tableSlice, {
    switchTableDataLoadingStatus,
    swithUsersDataEmptyStatus,
    setRequestCount,
    sortUsersByASC,
    sortUsersByDSC,
    filterUsers
} from '../slices/tableSlice';

import { fetchUsersData } from '../api/fetchUsersData';

import { Itable } from '../../Types/tableSliceTypes';

// /. imports

const initialState: any = {
    tableData: [],
    filteredTableData: [],
    fetchUsersStatus: '',
    fetchUsersErrMsg: '',
    requestСount: 0
};

describe('tableSlice', () => {
    let mockTableData: Itable[] = [];

    beforeEach(() => {
        mockTableData = [
            {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                birth: '24/06/1995',
                phone: '1-770-736-8031 x56442',
                email: 'Sincere@april.biz',
                address: { city: 'Gwenborough' },
                filial: 'Филиал №2',
                status: 'Новая',
                isPaid: false
            },
            {
                id: 2,
                name: 'Graham Bewc',
                username: 'Afser',
                birth: '12/01/1976',
                phone: '3-333-333-3333 x33',
                email: 'Csdrdropmail@april.biz',
                address: { city: 'Undefined' },
                filial: 'Филиал №1',
                status: 'В обработке',
                isPaid: true
            }
        ];
    });

    describe('tableSlice Action Creators', () => {
        it('should return default state when passed an empty action', () => {
            const result = tableSlice(undefined, { type: '' }); // arg1: state , arg2: action

            expect(result).toEqual({
                fetchUsersStatus: '',
                fetchUsersErrMsg: '',
                requestСount: 0,
                isTableDataLoading: true,
                isUsersDataEmpty: false,
                tableData: [],
                filteredTableData: [],
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
            });
        });
        it('should switch isTableDataLoading status with switchTableDataLoadingStatus AC', () => {
            const action = {
                type: switchTableDataLoadingStatus.type,
                payload: false
            };
            const result = tableSlice(initialState, action);

            expect(result.isTableDataLoading).toBe(false);
        });
        it('should switch isUsersDataEmpty status with swithUsersDataEmptyStatus AC', () => {
            const action = {
                type: swithUsersDataEmptyStatus.type,
                payload: true
            };
            const result = tableSlice(initialState, action);

            expect(result.isUsersDataEmpty).toBe(true);
        });
        it('should update requestCount value with setRequestCount AC', () => {
            const action = { type: setRequestCount.type, payload: 123 };
            const result = tableSlice(initialState, action);

            expect(result.requestСount).toBe(123);
        });
        it('should filter filteredTableData[] by props with filterUsers AC', () => {
            const action = {
                type: filterUsers.type,
                payload: { filterProp: 'ID', value: '0' }
            };
            const result = tableSlice(
                // replace tableData[] by mock-data for testing
                { ...initialState, tableData: mockTableData },
                action
            );

            expect(result.filteredTableData).toEqual([]);
        });
    });
    describe('tableSlice Extra Reducers', () => {
        it('should change state with "fetchUsersData.pending" action', () => {
            const state = tableSlice(initialState, fetchUsersData.pending(''));
            expect(state.fetchUsersStatus).toBe('loading');
            expect(state.fetchUsersErrMsg).toBeNull(); // .toBe(null)
        });
        it('should change state with "fetchUsersData.fulfilled" action', () => {
            const state = tableSlice(
                initialState,
                fetchUsersData.fulfilled(mockTableData, '')
            );
            expect(state).toEqual({
                tableData: mockTableData,
                filteredTableData: mockTableData,
                fetchUsersStatus: 'success',
                fetchUsersErrMsg: '',
                requestСount: mockTableData.length
            });
        });
        it('should change state with "fetchUsersData.rejected" action', () => {
            const action = {
                type: fetchUsersData.rejected.type,
                payload: 'Failed to fetch'
            };
            const state = tableSlice(initialState, action);

            expect(state).toEqual({
                tableData: [],
                filteredTableData: [],
                fetchUsersStatus: 'failed',
                fetchUsersErrMsg: 'Failed to fetch',
                requestСount: 0
            });
        });
    });
});
