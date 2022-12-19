import { fetchPostsData } from './../api/fetchPostsData';

// /. imports

global.fetch = jest.fn();

describe('fetchPostsData AsyncThunk', () => {
    it('should fetchPostsData with RESOLVED response', async () => {
        const mockPost = [
            {
                userId: 1,
                id: 1,
                title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body: 'quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto'
            }
        ];

        (fetch as jest.MockedFunction<any>).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockPost)
        });

        const dispatch = jest.fn();
        const thunk = fetchPostsData();

        await thunk(dispatch, () => ({}), null);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2); // pending, fulfilled

        const [start, end] = calls;
        expect(start[0].type).toBe('postSlice/fetchPostsData/pending');
        expect(end[0].type).toBe('postSlice/fetchPostsData/fulfilled');
        expect(end[0].payload).toBe(mockPost);
    });

    it('should fetchPostsData with REJECTED response', async () => {
        (fetch as jest.MockedFunction<any>).mockResolvedValue({
            ok: false
        });

        const dispatch = jest.fn();
        const thunk = fetchPostsData();

        await thunk(dispatch, () => ({}), null);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2); // pending, rejected

        const [start, end] = calls;

        expect(start[0].type).toBe('postSlice/fetchPostsData/pending');
        expect(end[0].type).toBe('postSlice/fetchPostsData/rejected');
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe('Response: server error!');
    });
});
