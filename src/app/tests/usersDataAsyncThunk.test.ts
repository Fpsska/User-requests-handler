import { fetchUsersData } from '../api/fetchUsersData';

// /. imports

global.fetch = jest.fn();

describe('fetchUsersData AsyncThunk', () => {
    it('should fetchUsersData with RESOLVED response', async () => {
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
                city: 'Gwenborough'
            }
        ];
        (fetch as jest.MockedFunction<any>).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockUsers)
        });

        const dispatch = jest.fn();
        const thunk = fetchUsersData();

        await thunk(dispatch, () => ({}), null);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2); // pending, fulfilled

        const [start, end] = calls;
        expect(start[0].type).toBe('tableSlice/fetchUsersData/pending');
        expect(end[0].type).toBe('tableSlice/fetchUsersData/fulfilled');
        expect(end[0].payload).toBe(mockUsers);
    });

    it('should fetchUsersData with REJECTED response', async () => {
        (fetch as jest.MockedFunction<any>).mockResolvedValue({
            ok: false
        });

        const dispatch = jest.fn();
        const thunk = fetchUsersData();

        await thunk(dispatch, () => ({}), null);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2); // pending, rejected

        const [start, end] = calls;

        expect(start[0].type).toBe('tableSlice/fetchUsersData/pending');
        expect(end[0].type).toBe('tableSlice/fetchUsersData/rejected');
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe('Response: server error!');
    });
});
