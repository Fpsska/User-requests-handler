import React from 'react';

import { optionsTypes } from '../../Types/formSliceTypes';

import { useAppDispatch } from '../../app/hooks';

import { filterUsers } from '../../app/slices/tableSlice';

// /. imports

interface propTypes {
    id: string,
    options: optionsTypes[]
}

// /. interfaces

const FormSelectTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        options
    } = props;

    const dispatch = useAppDispatch();

    const handleSelect = (value: any): void => {
        switch (id) {
            case 'FILIAL':
                dispatch(filterUsers({ name: id, value }));
                break;
            case 'PAY':
                dispatch(filterUsers({ name: id, value }));
                break;
        }
    };

    return (
        <div id={id} className="form__template">
            <select className="selection-menu" defaultValue={'default'} onChange={(e) => handleSelect(e.target.value)}>
                {options.map(item => {
                    return (
                        <option
                            className="selection-menu__option"
                            key={item.id}
                            value={item.option}
                        >
                            {item.option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FormSelectTemplate;