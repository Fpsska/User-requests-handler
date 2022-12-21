import tableSlice, {
    switchTableDataLoadingStatus,
    swithUsersDataEmptyStatus,
    setRequestCount,
    sortUsersByASC,
    sortUsersByDSC,
    filterUsers
} from '../slices/tableSlice';
import { fetchUsersData } from '../api/fetchUsersData';

// /. imports

const initialState: any = {
    tableData: [],
    filteredTableData: [],
    fetchUsersStatus: '',
    fetchUsersErrMsg: '',
    requestСount: 0
};

describe('tableSlice', () => {
    describe('tableSlice Action Creators', () => {
        it('should return default state when passed an empty action', () => {
            const result = tableSlice(undefined, { type: '' }); // arg1: state , arg2: action

            expect(result).toEqual({
                isUsersDataEmpty: false,
                fetchUsersStatus: '',
                fetchUsersErrMsg: '',
                requestСount: 0,
                isTableDataLoading: true,
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
            const mockTableData = [
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
                }
            ];

            const action = {
                type: filterUsers.type,
                payload: { filterProp: 'ID', value: '0' }
            };
            const result = tableSlice(
                // replace tableData[] by mock-data for testing
                { ...initialState, tableData: mockTableData },
                action
            );

            expect(result.filteredTableData).toStrictEqual([]);
        });
    });
    describe('tableSlice Extra Reducers', () => {
        it('should change state with "fetchUsersData.pending" action', () => {
            const state = tableSlice(initialState, fetchUsersData.pending(''));
            expect(state.fetchUsersStatus).toBe('loading');
            expect(state.fetchUsersErrMsg).toBeNull(); // .toBe(null)
        });
        it('should change state with "fetchUsersData.fulfilled" action', () => {
            const mockUsers = [
                {
                    id: 1,
                    name: 'Leanne Graham',
                    birth: '28/04/1979',
                    phone: '1-770-736-8031',
                    filial: 'Филиал №1',
                    isPaid: true,
                    status: 'Новая',
                    email: 'Sincere@april.biz',
                    username: 'Bret',
                    address: { city: 'Gwenborough' }
                }
            ];

            const state = tableSlice(
                initialState,
                fetchUsersData.fulfilled(mockUsers, '')
            );
            expect(state).toEqual({
                tableData: mockUsers,
                filteredTableData: mockUsers,
                fetchUsersStatus: 'success',
                fetchUsersErrMsg: '',
                requestСount: mockUsers.length
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
