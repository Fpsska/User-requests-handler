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
            type: 'number',
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

export const { } = formSlice.actions;

export default formSlice.reducer;