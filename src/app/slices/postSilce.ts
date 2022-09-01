import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPostsData } from '../api/fetchPostsData';

import { postDataTypes } from '../../Types/postSliceTypes';

// /. imports

interface postSilceTypes {
    status: string,
    fetchPostsErrMsg: string,
    isPostDataLoading: boolean,
    postData: postDataTypes[];
}

const initialState: postSilceTypes = {
    status: '',
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
        [fetchPostsData.pending.type]: (state) => {
            state.status = 'loading';
        },
        [fetchPostsData.fulfilled.type]: (
            state,
            action: PayloadAction<postDataTypes[]>
        ) => {
            state.postData = action.payload;
            state.status = 'success';
        },
        [fetchPostsData.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.fetchPostsErrMsg = action.payload;
        }
    }
});

export const { switchPostDataLoadingStatus } = postSilce.actions;

export default postSilce.reducer;