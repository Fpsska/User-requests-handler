import { createSlice } from '@reduxjs/toolkit';

import { formSelectTemplatesTypes } from '../../types/formSliceTypes';

// /. imports

interface formSliceTypes {
    formSelectTemplates: formSelectTemplatesTypes[];
}

// /. interfaces

const initialState: formSliceTypes = {
    formSelectTemplates: [
        {
            id: 'FILIAL',
            options: [
                {
                    id: 1,
                    option: 'Филиал'
                },
                {
                    id: 2,
                    option: 'Филиал №2'
                },
                {
                    id: 3,
                    option: 'Филиал №1'
                }
            ]
        },
        {
            id: 'PAY',
            options: [
                {
                    id: 4,
                    option: 'Оплата'
                },
                {
                    id: 5,
                    option: 'оплачено'
                },
                {
                    id: 6,
                    option: 'не оплачено'
                }
            ]
        }
    ]
};

// /. initialState

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {}
});

// export const { } = formSlice.actions;

export default formSlice.reducer;
