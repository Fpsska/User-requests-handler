import React from 'react';

import { optionsTypes } from '../../Types/formSliceTypes';

import { useAppDispatch } from '../../app/hooks';

import { filterUsers } from '../../app/slices/tableSlice';

// /. imports

interface propTypes {
    id: string,
    options: optionsTypes[],
    isTableDataLoading: boolean,
    status: string
}

// /. interfaces

const FormSelectTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        options,
        isTableDataLoading,
        status
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
        <div className="form__template">
            <select className="selection-menu"
                defaultValue={options[0].option}
                onChange={(e) => handleSelect(e.target.value)}
                disabled={isTableDataLoading || status === 'failed'}
            >
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