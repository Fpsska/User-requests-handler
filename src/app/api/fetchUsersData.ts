import { createAsyncThunk } from '@reduxjs/toolkit';

import { Itable } from '../../Types/tableSliceTypes';

// /. imports

export const fetchUsersData = createAsyncThunk<
    Itable[],
    void,
    { rejectValue: string }
>('tableSlice/fetchUsersData', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(
            'https://jsonlaceholder.typicode.com/users'
        );

        if (!response.ok) {
            throw new Error('Response: server error!');
        }

        const data = await response.json();
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});
