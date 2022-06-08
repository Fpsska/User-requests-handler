import React from 'react';

import './form.scss';

// /. imports

const Form: React.FC = () => {
    return (
        <form className="form" action="#">
            <div className="form__wrapper">
                <div className="form__template">
                    <input className="form__input form__input--id" type="text" placeholder="ID" id="ID" />
                </div>

                <div className="form__template">
                    <input className="form__input form__input--fio" type="text" placeholder="ФИО" id="FIO" />
                </div>

                <div className="form__template">
                    <input className="form__input form__input--birth" type="text" placeholder="Дата рождения" id="BIRTH" />
                </div>

                <div className="form__template">
                    <input className="form__input form__input--phone" type="number" placeholder="Телефон" id="PHONE" />
                </div>

                <div className="form__template">
                    <select className="selection-menu">
                        <option className="selection-menu__option" disabled>Филиал</option>
                        <option className="">Филиал №1</option>
                        <option className="">Филиал №2</option>
                    </select>
                </div>

                <div className="form__template">
                    <select className="selection-menu">
                        <option className="selection-menu__option" disabled>Оплата</option>
                        <option className="selection-menu__option">оплачено</option>
                        <option className="selection-menu__option">не оплачено</option>
                    </select>
                </div>

            </div>
        </form>
    );
};

export default Form;