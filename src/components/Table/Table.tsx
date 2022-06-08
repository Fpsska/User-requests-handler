import React from 'react';

import { FaSort } from 'react-icons/fa';

import './table.scss';

// /. imports

const Table: React.FC = () => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead className="table__head sticky">
                    <tr className="table__row table__row--head">
                        <th className="table__col table__col--head">
                            ID
                            <FaSort />
                        </th>
                        <th className="table__col table__col--head">
                            ФИО
                            <FaSort />
                        </th>
                        <th className="table__col table__col--head">
                            Дата рождения
                            <FaSort />
                        </th>
                        <th className="table__col table__col--head">
                            Телефон
                            <FaSort />
                        </th>
                        <th className="table__col table__col--head">
                            Филиал
                            <FaSort />
                        </th>
                        <th className="table__col table__col--head">
                            Оплата
                            <FaSort />
                        </th>
                        <th className="table__col table__col--head">
                            Статус
                            <FaSort />
                        </th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    <tr className="table__row">
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                        <td className="table__cell">Text</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;