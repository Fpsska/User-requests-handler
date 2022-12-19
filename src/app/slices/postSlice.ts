import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPostsData } from '../api/fetchPostsData';

import { postDataTypes } from '../../Types/postSliceTypes';

// /. imports

interface postSilceTypes {
    fetchPostsStatus: string;
    fetchPostsErrMsg: string | null;
    isPostDataLoading: boolean;
    postData: postDataTypes[];
}

const initialState: postSilceTypes = {
    fetchPostsStatus: '',
    fetchPostsErrMsg: '',
    isPostDataLoading: true,
    postData: []
};

const postSilce = createSlice({
    name: 'postSilce',
    initialState,
    reducers: {
        switchPostDataLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isPostDataLoading = action.payload;
        }
    },
    extraReducers: {
        [fetchPostsData.pending.type]: state => {
            state.fetchPostsStatus = 'loading';
            state.fetchPostsErrMsg = null;
        },
        [fetchPostsData.fulfilled.type]: (
            state,
            action: PayloadAction<postDataTypes[]>
        ) => {
            state.postData = action.payload;
            state.fetchPostsStatus = 'success';
        },
        [fetchPostsData.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.fetchPostsStatus = 'failed';
            state.fetchPostsErrMsg = action.payload;
        }
    }
});

export const { switchPostDataLoadingStatus } = postSilce.actions;

export default postSilce.reducer;
