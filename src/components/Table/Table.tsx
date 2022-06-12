import React, { useEffect, useState } from 'react';

import { FaSortDown } from 'react-icons/fa';

import { TiArrowSortedUp } from 'react-icons/ti';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Preloader from '../common/Preloader/Preloader';

import {
    swithUsersDataEmptyStatus,
    sortUsersByASC,
    sortUsersByDSC
} from '../../app/slices/tableSlice';

import TableTemplate from './TableTemplate';

import './table.scss';

// /. imports

const Table: React.FC = () => {

    const {
        tableData,
        isTableDataLoading,
        fetchUsersErrMsg,
        isUsersDataEmpty
    } = useAppSelector(state => state.tableSlice);

    const [sortOder, setSetOrder] = useState<string>('DSC');
    const [statuses, setStatus] = useState<any>(
        {
            id: false,
            fio: false,
            birth: false,
            phone: false,
            filial: false,
            isPaid: false,
            status: false
        }
    );

    const dispatch = useAppDispatch();

    const iconHandler = (name: string): void => {
        switch (!isTableDataLoading && name) {
            case 'id':
                setStatus(() => ({ ...statuses, id: !statuses.id }));
                break;
            case 'fio':
                setStatus(() => ({ ...statuses, fio: !statuses.fio }));
                break;
            case 'birth':
                setStatus(() => ({ ...statuses, birth: !statuses.birth }));
                break;
            case 'phone':
                setStatus(() => ({ ...statuses, phone: !statuses.phone }));
                break;
            case 'filial':
                setStatus(() => ({ ...statuses, filial: !statuses.filial }));
                break;
            case 'isPaid':
                setStatus(() => ({ ...statuses, isPaid: !statuses.isPaid }));
                break;
            case 'status':
                setStatus(() => ({ ...statuses, status: !statuses.status }));
                break;
        }
    };

    useEffect(() => {
        tableData.length === 0
            ? dispatch(swithUsersDataEmptyStatus(true))
            : dispatch(swithUsersDataEmptyStatus(false));
    }, [tableData]);

    const sortUsersData = (name: string): void => {
        if (!isTableDataLoading && sortOder === 'ASC') {
            setSetOrder('DSC');
            dispatch(sortUsersByASC(name));
        } else if (!isTableDataLoading && sortOder === 'DSC') {
            setSetOrder('ASC');
            dispatch(sortUsersByDSC(name));
        }
        iconHandler(name);
    };

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead className="table__head sticky">
                    <tr className="table__row table__row--head">
                        <th className="table__col table__col--head" onClick={() => sortUsersData('id')}>
                            ID
                            {!isTableDataLoading && !isUsersDataEmpty && statuses.id ? <TiArrowSortedUp /> : <FaSortDown />}
                        </th>
                        <th className="table__col table__col--head" onClick={() => sortUsersData('fio')}>
                            ФИО
                            {!isTableDataLoading && !isUsersDataEmpty && statuses.fio ? <TiArrowSortedUp /> : <FaSortDown />}
                        </th>
                        <th className="table__col table__col--head" onClick={() => sortUsersData('birth')}>
                            Дата рождения
                            {!isTableDataLoading && !isUsersDataEmpty && statuses.birth ? <TiArrowSortedUp /> : <FaSortDown />}
                        </th>
                        <th className="table__col table__col--head" onClick={() => sortUsersData('phone')}>
                            Телефон
                            {!isTableDataLoading && !isUsersDataEmpty && statuses.phone ? <TiArrowSortedUp /> : <FaSortDown />}
                        </th>
                        <th className="table__col table__col--head" onClick={() => sortUsersData('filial')}>
                            Филиал
                            {!isTableDataLoading && !isUsersDataEmpty && statuses.filial ? <TiArrowSortedUp /> : <FaSortDown />}
                        </th>
                        <th className="table__col table__col--head" onClick={() => sortUsersData('isPaid')}>
                            Оплата
                            {!isTableDataLoading && !isUsersDataEmpty && statuses.isPaid ? <TiArrowSortedUp /> : <FaSortDown />}
                        </th>
                        <th className="table__col table__col--head" onClick={() => sortUsersData('status')}>
                            Статус
                            {!isTableDataLoading && !isUsersDataEmpty && statuses.status ? <TiArrowSortedUp /> : <FaSortDown />}
                        </th>
                    </tr>
                </thead>
                <tbody className={isTableDataLoading ? 'table__body loading' : isUsersDataEmpty ? 'table__body empty' : 'table__body'}>
                    {isTableDataLoading
                        ? <div className="table__preloader">
                            <Preloader />
                        </div>
                        : <>
                            {tableData.map(item => {
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
                        !isTableDataLoading && fetchUsersErrMsg && <span className="error-message">Error: {fetchUsersErrMsg}</span>
                    }
                    {
                        !isTableDataLoading && !fetchUsersErrMsg && isUsersDataEmpty ? <span className="message">No matches!</span> : <></>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;