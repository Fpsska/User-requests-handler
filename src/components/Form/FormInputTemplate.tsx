import React from 'react';

import { useAppDispatch } from '../../app/hooks';

import { filterUsers } from '../../app/slices/tableSlice';

// /. imports

interface propTypes {
    id: string,
    type: string,
    placeholder: string
}

// /. interfaces

const FormInputTemplate: React.FC<propTypes> = (props) => {

    const {
        id,  // string
        type,
        placeholder
    } = props;

    const dispatch = useAppDispatch();

    const inputHandler = (value: string): void => {
        switch (id) {
            case 'ID':
                dispatch(filterUsers({ name: id, value }));
                break;
            case 'FIO':
                dispatch(filterUsers({ name: id, value }));
                break;
        }
    };

    return (
        <div className="form__template">
            <input
                id={id}
                className={id === 'ID' ? 'form__input form__input--id' : 'form__input'}
                type={type}
                placeholder={placeholder}
                onChange={(e) => inputHandler(e.target.value)}  //dispatch(filterUsers({ name: id, value: e.target.value }))
            />
        </div>
    );
};

export default FormInputTemplate;