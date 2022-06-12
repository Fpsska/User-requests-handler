import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Preloader from '../common/Preloader/Preloader';

import {
    swithUsersDataEmptyStatus,
    sortUsersByASC,
    sortUsersByDSC
} from '../../app/slices/tableSlice';

import TableBodyTemplate from './TableBodyTemplate';
import TableHeadTemplate from './TableHeadTemplate';

import './table.scss';

// /. imports

const Table: React.FC = () => {

    const {
        tableData,
        isTableDataLoading,
        fetchUsersErrMsg,
        isUsersDataEmpty,
        tableHeadTemplate
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

    useEffect(() => {
        tableData.length === 0
            ? dispatch(swithUsersDataEmptyStatus(true))
            : dispatch(swithUsersDataEmptyStatus(false));
    }, [tableData]);

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead className="table__head sticky">
                    <tr className="table__row table__row--head">
                        {
                            tableHeadTemplate.map(item => {
                                return (
                                    <TableHeadTemplate
                                        key={item.id}
                                        name={item.name}
                                        text={item.text}
                                        isTableDataLoading={isTableDataLoading}
                                        isUsersDataEmpty={isUsersDataEmpty}
                                    />
                                )
                            })
                        }
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
                                    <TableBodyTemplate
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