import React from 'react';

import { useAppSelector } from '../../app/hooks';

import FormInputTemplate from './FormInputTemplate';
import FormSelectTemplate from './FormSelectTemplate';

import './form.scss';

// /. imports

const Form: React.FC = () => {

    const { formInputTemplates, formSelectTemplates } = useAppSelector(state => state.formSlice);

    return (
        <form className="form" action="#">
            <div className="form__wrapper">
                <>
                    {formInputTemplates.map(item => {
                        return (
                            <FormInputTemplate
                                key={item.id}
                                id={item.id}
                                type={item.type}
                                placeholder={item.placeholder}
                            />
                        );
                    })}
                </>
                <>
                    {formSelectTemplates.map(item => {
                        return (
                            <FormSelectTemplate
                                key={item.id}
                                id={item.id}
                                options={item.options}
                            />
                        );
                    })}
                </>
            </div>
        </form>
    );
};

export default Form;