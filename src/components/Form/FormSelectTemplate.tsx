import React from 'react';

import { optionsTypes } from '../../Types/formSliceTypes';

// /. imports

interface propTypes {
    id: string,
    text: string,
    options: optionsTypes[]
}

// /. interfaces

const FormSelectTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        text,
        options
    } = props;

    return (
        <div id={id} className="form__template">
            <select className="selection-menu" defaultValue={'default'}>
                <option className="selection-menu__option" value="default" disabled>{text}</option>
                {options.map(item => {
                    return (
                        <option
                            key={item.id}
                            className="selection-menu__option"
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