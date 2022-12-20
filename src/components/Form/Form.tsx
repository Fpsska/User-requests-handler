import React, { useEffect, useRef } from 'react';

import { useAppSelector } from '../../app/hooks';

import { useInput } from '../../hooks/useInput';

import FormSelectTemplate from './FormSelectTemplate';

import './form.scss';

// /. imports

const Form: React.FC = () => {
    const { formSelectTemplates } = useAppSelector(state => state.formSlice);
    const { isTableDataLoading, fetchUsersStatus } = useAppSelector(
        state => state.tableSlice
    );

    const inputID = useInput();
    const inputFIO = useInput();
    const inputBIRTH = useInput();
    const inputPHONE = useInput();

    const inputIdRef = useRef<HTMLInputElement>(null!);

    const inputHandler = (
        name: string,
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        switch (name) {
            case 'ID':
                inputID.onInputChange({
                    name,
                    value: e.target.value
                });

                inputFIO.setValue('');
                inputBIRTH.setValue('');
                inputPHONE.setValue('');
                break;
            case 'FIO':
                inputFIO.onInputChange({ name, value: e.target.value });

                inputID.setValue('');
                inputBIRTH.setValue('');
                inputPHONE.setValue('');
                break;
            case 'BIRTH':
                inputBIRTH.onInputChange({ name, value: e.target.value });

                inputID.setValue('');
                inputFIO.setValue('');
                inputPHONE.setValue('');
                break;
            case 'PHONE':
                inputPHONE.onInputChange({ name, value: e.target.value });

                inputID.setValue('');
                inputFIO.setValue('');
                inputBIRTH.setValue('');
                break;
            default:
                return;
        }
    };

    useEffect(() => {
        if (!isTableDataLoading && inputIdRef.current) {
            inputIdRef.current.focus();
        }
    }, [isTableDataLoading, inputIdRef]);

    return (
        <form className="form">
            <fieldset className="form__wrapper">
                <input
                    className="form__input form__input--id"
                    type="text"
                    placeholder="ID"
                    value={inputID.value}
                    onChange={e => inputHandler('ID', e)}
                    onKeyDown={e => e.key === 'e' && e.preventDefault()}
                    disabled={
                        isTableDataLoading || fetchUsersStatus === 'failed'
                    }
                />
                <input
                    className="form__input"
                    type="text"
                    placeholder="ФИО"
                    value={inputFIO.value}
                    onChange={e => inputHandler('FIO', e)}
                    disabled={
                        isTableDataLoading || fetchUsersStatus === 'failed'
                    }
                />
                <input
                    className="form__input"
                    type="text"
                    placeholder="Дата рождения"
                    value={inputBIRTH.value}
                    onChange={e => inputHandler('BIRTH', e)}
                    onKeyDown={e => e.key === 'e' && e.preventDefault()}
                    disabled={
                        isTableDataLoading || fetchUsersStatus === 'failed'
                    }
                />
                <input
                    className="form__input"
                    type="text"
                    placeholder="Телефон"
                    value={inputPHONE.value}
                    onChange={e => inputHandler('PHONE', e)}
                    onKeyDown={e => e.key === 'e' && e.preventDefault()}
                    disabled={
                        isTableDataLoading || fetchUsersStatus === 'failed'
                    }
                />
                <>
                    {formSelectTemplates.map(item => {
                        return (
                            <FormSelectTemplate
                                key={item.id}
                                {...item}
                                role={'form__selection-menu'}
                                isTableDataLoading={isTableDataLoading}
                                status={fetchUsersStatus}
                            />
                        );
                    })}
                </>
            </fieldset>
        </form>
    );
};

export default Form;
