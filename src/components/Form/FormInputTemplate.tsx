import React from 'react';

import { useAppDispatch } from '../../app/hooks';

import { filterUsers } from '../../app/slices/tableSlice';

import { useInput } from '../../hooks/useInput';

// /. imports

interface propTypes {
    id: string,
    type: string,
    placeholder: string
}

// /. interfaces

const FormInputTemplate: React.FC<propTypes> = (props) => {

    const {
        id,  
        type,
        placeholder
    } = props;

    const dispatch = useAppDispatch();

    const inputFIO = useInput('');
    const restInputs = useInput('');

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (id) {
            case 'ID':
                restInputs.onInputChange({ name: 'ANY', value: e.target.value });
                dispatch(filterUsers({ name: id, value: restInputs.value }));
                break;
            case 'FIO':
                inputFIO.onInputChange({ name: 'FIO', value: e.target.value });
                dispatch(filterUsers({ name: id, value: inputFIO.value }));
                break;
            case 'BIRTH':
                restInputs.onInputChange({ name: 'ANY', value: e.target.value });
                dispatch(filterUsers({ name: id, value: restInputs.value }));
                break;
            case 'PHONE':
                restInputs.onInputChange({ name: 'ANY', value: e.target.value });
                dispatch(filterUsers({ name: id, value: restInputs.value }));
                break;
        }
    };

    return (
        <div className="form__template">
            <input
                id={id}
                className={id === 'ID' ? 'form__input form__input--id' : 'form__input'}
                type={type}
                value={id === 'FIO' ? inputFIO.value : restInputs.value}
                placeholder={placeholder}
                onChange={(e) => inputHandler(e)}
            />
        </div>
    );
};

export default FormInputTemplate;