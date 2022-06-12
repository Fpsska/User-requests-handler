import { useState } from 'react';

// /. imports

interface propTypes {
    name: string,
    value: string
}

// /. interfaces

export function useInput(currentValue: string) {

    const [value, setValue] = useState<string>(currentValue);


    const onInputChange = (props: propTypes) => {
        const { name, value } = props;

        switch (name) {
            case 'FIO':
                setValue(value.replace(/[0-9]/g, ''));
                break;
            case 'ANY':
                setValue(value);
                break;
        }
    };

    return {
        value,
        onInputChange
    };
}