import { createSlice } from '@reduxjs/toolkit';

import { formSelectData } from 'context/db';

import { IformSilce } from '../../types/formSliceTypes';

// /. imports

const initialState: IformSilce = {
    formSelectTemplates: formSelectData
};

// /. initialState

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {}
});

// export const { } = formSlice.actions;

export default formSlice.reducer;
