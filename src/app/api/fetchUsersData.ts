import { createAsyncThunk } from '@reduxjs/toolkit';

// /. imports

export const fetchUsersData = createAsyncThunk(
    'tableSlice/fetchUsersData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.ypicode.com/users'
            );

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
