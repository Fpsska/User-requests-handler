import React from 'react';

import { FaSort } from 'react-icons/fa';

import './form.scss';

// /. imports

const Form: React.FC = () => {
    return (
        <form className="form" action="#">
            <div className="form__wrapper">

                <div className="form__template">
                    <label className="form__label" htmlFor="ID">
                        <input className="form__input form__input--id" type="text" placeholder="ID" id="ID" />
                        <div className="form__controls">
                            <span className="form__text">ID</span>
                            <FaSort />
                        </div>
                    </label>
                </div>

                <div className="form__template">
                    <label className="form__label" htmlFor="FIO">
                        <input className="form__input form__input--fio" type="text" placeholder="ФИО" id="FIO" />
                        <div className="form__controls">
                            <span className="form__text">ФИО</span>
                            <FaSort />
                        </div>
                    </label>
                </div>

                <div className="form__template">
                    <label className="form__label" htmlFor="BIRTH">
                        <input className="form__input form__input--birth" type="text" placeholder="Дата рождения" id="BIRTH" />
                        <div className="form__controls">
                            <span className="form__text">Дата рождения</span>
                            <FaSort />
                        </div>
                    </label>
                </div>

                <div className="form__template">
                    <label className="form__label" htmlFor="PHONE">
                        <input className="form__input form__input--phone" type="number" placeholder="Телефон" id="PHONE" />
                        <div className="form__controls">
                            <span className="form__text">Телефон</span>
                            <FaSort />
                        </div>
                    </label>
                </div>

                <div className="form__template">
                    <select className="selection-menu">
                        <option className="selection-menu__option" disabled>Филиал</option>
                        <option className="">Филиал №1</option>
                        <option className="">Филиал №2</option>
                    </select>
                    <div className="form__controls">
                        <span className="form__text">Филиал</span>
                        <FaSort />
                    </div>
                </div>

                <div className="form__template">
                    <select className="selection-menu">
                        <option className="selection-menu__option" disabled>Оплата</option>
                        <option className="selection-menu__option">оплачено</option>
                        <option className="selection-menu__option">не оплачено</option>
                    </select>
                    <div className="form__controls">
                        <span className="form__text">Оплата</span>
                        <FaSort />
                    </div>
                </div>

                <div className="form__template">
                    <div className="form__controls">
                        <span className="form__text">Статус</span>
                        <FaSort />
                    </div>
                </div>

            </div>
        </form>
    );
};

export default Form;