import React from 'react';

import { optionsTypes } from '../../types/formSliceTypes';

import { useAppDispatch } from '../../app/hooks';

import { filterUsers } from '../../app/slices/tableSlice';

// /. imports

interface propTypes {
    id: string;
    options: optionsTypes[];
    isTableDataLoading: boolean;
    status: string;
    role: string;
}

// /. interfaces

const FormSelectTemplate: React.FC<propTypes> = props => {
    const { id, options, isTableDataLoading, status, role } = props;

    const dispatch = useAppDispatch();

    const onSelectChange = (eventVal: string): void => {
        dispatch(filterUsers({ filterProp: id, value: eventVal }));
    };

    return (
        <select
            className={`${role ? role : ''} selection-menu`}
            defaultValue={options[0].option}
            onChange={e => onSelectChange(e.target.value)}
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
    );
};

export default FormSelectTemplate;
