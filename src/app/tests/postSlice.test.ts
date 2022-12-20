import postSlice, { switchPostDataLoadingStatus } from '../slices/postSlice';
import { fetchPostsData } from '../api/fetchPostsData';

// /. imports

const initialState: any = {
    postData: [],
    fetchPostsStatus: '',
    fetchPostsErrMsg: ''
};

describe('postSlice', () => {
    describe('postSlice Action Creators', () => {
        it('shouild return default state when passed an empty action', () => {
            const result = postSlice(undefined, { type: '' }); // arg1: state , arg2: action

            expect(result).toEqual({
                fetchPostsStatus: '',
                fetchPostsErrMsg: '',
                isPostDataLoading: true,
                postData: []
            });
        });
        it('should switch isPostDataLoading status with switchPostDataLoadingStatus AC', () => {
            const action = {
                type: switchPostDataLoadingStatus.type,
                payload: false
            };

            const result = postSlice(initialState, action);
            expect(result.isPostDataLoading).toBe(false);
        });
    });
    describe('postSlice Extra Reducers', () => {
        it('should change state with "fetchPostsData.pending" action', () => {
            const state = postSlice(initialState, fetchPostsData.pending(''));
            expect(state.fetchPostsStatus).toBe('loading');
            expect(state.fetchPostsErrMsg).toBeNull();
        });
        it('should change state with "fetchPostsData.fulfilled" action', () => {
            const mockPost = [
                {
                    userId: 1,
                    id: 1,
                    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                    body: 'quia et suscipitnsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto'
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
        it('should change state with "fetchPostsData.rejected" action', () => {
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
});
