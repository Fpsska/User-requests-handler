import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPostsData } from '../api/fetchPostsData';

import { IpostSilce } from '../../Types/postSliceTypes';

// /. imports

const initialState: IpostSilce = {
    fetchPostsStatus: '',
    fetchPostsErrMsg: '',
    isPostDataLoading: true,
    postData: []
};

// /. initialState

const postSilce = createSlice({
    name: 'postSilce',
    initialState,
    reducers: {
        switchPostDataLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isPostDataLoading = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPostsData.pending, state => {
                state.fetchPostsStatus = 'loading';
                state.fetchPostsErrMsg = null;
            })
            .addCase(fetchPostsData.fulfilled, (state, action) => {
                state.postData = action.payload;
                state.fetchPostsStatus = 'success';
            })
            .addCase(fetchPostsData.rejected, (state, action) => {
                state.fetchPostsStatus = 'failed';
                if (action.payload) {
                    state.fetchPostsErrMsg = action.payload;
                }
            });
    }
});

// /. slice

export const { switchPostDataLoadingStatus } = postSilce.actions;

export default postSilce.reducer;
