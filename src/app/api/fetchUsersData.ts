import { createAsyncThunk } from '@reduxjs/toolkit';

// /. imports

export const fetchUsersData = createAsyncThunk(
    'tableSlice/fetchUsersData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );

            if (!response.ok) {
                throw new Error('Response: server error!');
            }

            const data = await response.json();
            const data2x = data;

            return data.concat(data2x);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
