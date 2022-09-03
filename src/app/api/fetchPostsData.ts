import { createAsyncThunk } from '@reduxjs/toolkit';

// /. imports

export const fetchPostsData = createAsyncThunk(
    'postSilce/fetchPostsData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');

            if (!response.ok) {
                throw new Error('Response: server error!');
            }

            const data = await response.json();
            return data;

        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);