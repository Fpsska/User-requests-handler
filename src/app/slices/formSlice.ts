import { createSlice } from '@reduxjs/toolkit';

import { FormInputTemplatesTypes, formSelectTemplatesTypes } from '../../Types/formSliceTypes';

// /. imports

interface formSliceTypes {
    formInputTemplates: FormInputTemplatesTypes[],
    formSelectTemplates: formSelectTemplatesTypes[]
}

// /. interfaces

const initialState: formSliceTypes = {
    formInputTemplates: [
        {
            id: 'ID',
            type: 'text',
            placeholder: 'ID'
        },
        {
            id: 'FIO',
            type: 'text',
            placeholder: 'ФИО'
        },
        {
            id: 'BIRTH',
            type: 'text',
            placeholder: 'Дата рождения'
        },
        {
            id: 'PHONE',
            type: 'number',
            placeholder: 'Телефон'
        }
    ],
    formSelectTemplates: [
        {
            id: 'FILIAL',
            text: 'Филиал',
            options: [
                {
                    id: 1,
                    option: 'Филиал №2'
                },
                {
                    id: 2,
                    option: 'Филиал №1'
                }
            ]
        },
        {
            id: 'PAY',
            text: 'Оплата',
            options: [
                {
                    id: 3,
                    option: 'оплачено'
                },
                {
                    id: 4,
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

export const { } = formSlice.actions;

export default formSlice.reducer;