import { useState, useEffect } from 'react';

import { useAppDispatch } from 'app/hooks';

import { filterUsers } from 'app/slices/tableSlice';

// /. imports

interface propTypes {
    name: string;
    value: string;
}

// /. interfaces

export function useInput(): any {
    const [value, setValue] = useState<string>('');

    const dispatch = useAppDispatch();

    const onInputChange = (props: propTypes) => {
        const { name, value } = props;

        switch (name) {
            case 'ID':
                setValue(value.replace(/[^0-9]/g, ''));
                dispatch(
                    filterUsers({
                        filterProp: name,
                        value: value.replace(/[^0-9-]/g, '')
                    })
                );
                break;
            case 'FIO':
                setValue(value.replace(/[^a-zA-Z\s]/g, ''));
                dispatch(
                    filterUsers({
                        filterProp: name,
                        value: value.replace(/[^a-zA-Z\s]/g, '').trim()
                    })
                );
                break;
            case 'BIRTH':
                setValue(value.replace(/[^0-9/]/g, ''));
                dispatch(
                    filterUsers({
                        filterProp: name,
                        value: value.replace(/[^0-9/]/g, '')
                    })
                );
                break;
            case 'PHONE':
                setValue(value.replace(/[^0-9-)(.]/g, ''));
                dispatch(
                    filterUsers({
                        filterProp: name,
                        value: value.replace(/[^0-9-)(.]/g, '')
                    })
                );
                break;
            default:
                return;
        }
    };

    return {
        value,
        setValue,
        onInputChange
    };
}
