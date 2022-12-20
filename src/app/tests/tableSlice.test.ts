import tableSlice from '../slices/tableSlice';
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

describe('tableSlice Extra Reducers', () => {
    it('should change status with "fetchUsersData.pending" action', () => {
        const state = tableSlice(initialState, fetchUsersData.pending(''));
        expect(state.fetchUsersStatus).toBe('loading');
        expect(state.fetchUsersErrMsg).toBeNull(); // .toBe(null)
    });
    it('should change status with "fetchUsersData.fulfilled" action', () => {
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
    it('should change status with "fetchUsersData.rejected" action', () => {
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
