import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { useInput } from '../../hooks/useInput';

import FormSelectTemplate from './FormSelectTemplate';

import './form.scss';

// /. imports

const Form: React.FC = () => {

    const { formSelectTemplates } = useAppSelector(state => state.formSlice);
    const { isTableDataLoading, status } = useAppSelector(state => state.tableSlice);

    const inputID = useInput('');
    const inputFIO = useInput('');
    const inputBIRTH = useInput('');
    const inputPHONE = useInput('');

    const inputHandler = (name: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (name) {
            case 'ID':
                inputID.onInputChange({ name: 'ID', value: e.target.value });
                break;
            case 'FIO':
                inputFIO.onInputChange({ name: 'FIO', value: e.target.value });
                break;
            case 'BIRTH':
                inputBIRTH.onInputChange({ name: 'BIRTH', value: e.target.value });
                break;
            case 'PHONE':
                inputPHONE.onInputChange({ name: 'PHONE', value: e.target.value });
                break;
        }
    };

    return (
        <form className="form" action="#">
            <div className="form__wrapper">
                <div className="form__template">
                    <input className="form__input form__input--id"
                        type="number"
                        placeholder="ID"
                        value={inputID.value}
                        onChange={e => inputHandler('ID', e)}
                        disabled={isTableDataLoading || status === 'failed'}
                    />
                </div>
                <div className="form__template">
                    <input className="form__input"
                        type="text"
                        placeholder="ФИО"
                        value={inputFIO.value}
                        onChange={e => inputHandler('FIO', e)}
                        disabled={isTableDataLoading || status === 'failed'}
                    />
                </div>
                <div className="form__template">
                    <input className="form__input"
                        type="number"
                        placeholder="Дата рождения"
                        value={inputBIRTH.value}
                        onChange={e => inputHandler('BIRTH', e)}
                        disabled={isTableDataLoading || status === 'failed'}
                    />
                </div>
                <div className="form__template">
                    <input className="form__input"
                        type="number"
                        placeholder="Телефон"
                        value={inputPHONE.value}
                        onChange={e => inputHandler('PHONE', e)}
                        disabled={isTableDataLoading || status === 'failed'}
                    />
                </div>
                <>
                    {formSelectTemplates.map(item => {
                        return (
                            <FormSelectTemplate
                                key={item.id}
                                id={item.id}
                                options={item.options}
                                isTableDataLoading={isTableDataLoading}
                                status={status}
                            />
                        );
                    })}
                </>
            </div>
        </form>
    );
};

export default Form;