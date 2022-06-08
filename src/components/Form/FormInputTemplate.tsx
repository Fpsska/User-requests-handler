import React from 'react';

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

    return (
        <div className="form__template">
            <input
                id={id}
                className={id === 'ID' ? 'form__input form__input--id' : 'form__input'}
                type={type}
                placeholder={placeholder} />
        </div>
    );
};

export default FormInputTemplate;