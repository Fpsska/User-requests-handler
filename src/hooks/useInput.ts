import { useState } from 'react';

import { useAppDispatch } from '../app/hooks';

import { filterUsers } from '../app/slices/tableSlice';

// /. imports

interface propTypes {
    name: string,
    value: string
}

// /. interfaces

export function useInput(currentValue: string) {

    const [value, setValue] = useState<string>(currentValue);

    const dispatch = useAppDispatch();

    const onInputChange = (props: propTypes) => {
        const { name, value } = props;

        switch (name) {
            case 'ID':
                setValue(value);
                dispatch(filterUsers({ name, value }));
                break;
            case 'FIO':
                setValue(value.replace(/[0-9]/g, ''));
                dispatch(filterUsers({ name, value: value.replace(/[0-9]/g, '') }));
                break;
            case 'BIRTH':
                setValue(value);
                dispatch(filterUsers({ name, value }));
                break;
            case 'PHONE':
                setValue(value);
                dispatch(filterUsers({ name, value }));
                break;
        }
    };

    return {
        value,
        onInputChange
    };
}