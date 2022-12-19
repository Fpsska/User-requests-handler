import postSlice from '../slices/postSlice';
import { fetchPostsData } from '../api/fetchPostsData';

// /. imports

const initialState: any = {
    postData: [],
    fetchPostsStatus: '',
    fetchPostsErrMsg: ''
};

describe('postSlice Extra Reducers', () => {
    it('should change status with "fetchPostsData.pending" action', () => {
        const state = postSlice(initialState, fetchPostsData.pending(''));
        expect(state.fetchPostsStatus).toBe('loading');
        expect(state.fetchPostsErrMsg).toBeNull();
    });
    it('should change status with "fetchPostsData.fulfilled" action', () => {
        const mockPost = [
            {
                userId: 1,
                id: 1,
                title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body: 'quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto'
            }
        ];

        const state = postSlice(
            initialState,
            fetchPostsData.fulfilled(mockPost, '')
        );
        expect(state).toEqual({
            postData: mockPost,
            fetchPostsStatus: 'success',
            fetchPostsErrMsg: ''
        });
    });
    it('should change status with "fetchPostsData.rejected" action', () => {
        const action = {
            type: fetchPostsData.rejected.type,
            payload: 'Failed to fetch'
        };
        const state = postSlice(initialState, action);

        expect(state).toEqual({
            postData: [],
            fetchPostsStatus: 'failed',
            fetchPostsErrMsg: 'Failed to fetch'
        });
    });
});
