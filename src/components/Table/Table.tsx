import React from 'react';

import { FaSort } from 'react-icons/fa';

import { useAppSelector } from '../../app/hooks';

import Preloader from '../common/Preloader/Preloader';

import TableTemplate from './TableTemplate';

import './table.scss';

// /. imports

const Table: React.FC = () => {

    const {
        tableTemplates,
        isTableDataLoading,
        fetchUsersErrMsg
    } = useAppSelector(state => state.tableSlice);

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
                <tbody className={isTableDataLoading ? 'table__body loading' : 'table__body'}>
                    {isTableDataLoading
                        ? <div className="table__preloader">
                            <Preloader />
                        </div>
                        : <>
                            {tableTemplates.map(item => {
                                return (
                                    <TableTemplate
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        birth={item.birth}
                                        phone={item.phone}
                                        filial={item.filial}
                                        isPaid={item.isPaid}
                                        status={item.status}
                                    />
                                );
                            })}
                        </>
                    }
                    {
                        !isTableDataLoading && fetchUsersErrMsg && <span className="error-message">Error: {fetchUsersErrMsg}!</span>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;