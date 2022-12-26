import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Preloader from '../common/Preloader/Preloader';

import { swithUsersDataEmptyStatus } from '../../app/slices/tableSlice';

import TableBodyTemplate from './TableBodyTemplate';
import TableHeadTemplate from './TableHeadTemplate';

import './table.scss';

// /. imports

const Table: React.FC = () => {
    const {
        filteredTableData,
        isTableDataLoading,
        fetchUsersErrMsg,
        isUsersDataEmpty,
        tableHeadTemplate
    } = useAppSelector(state => state.tableSlice);

    const [isError, setErorrStatus] = useState<boolean>(false);
    const [isEmptyCase, setEmptyCaseStatus] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    // /. hooks

    useEffect(() => {
        filteredTableData.length === 0
            ? dispatch(swithUsersDataEmptyStatus(true))
            : dispatch(swithUsersDataEmptyStatus(false));
    }, [filteredTableData]);

    useEffect(() => {
        if (!isTableDataLoading && fetchUsersErrMsg) {
            setErorrStatus(true);
        } else {
            setErorrStatus(false);
        }
    }, [isTableDataLoading, fetchUsersErrMsg]);

    useEffect(() => {
        const emptyCondition =
            !isTableDataLoading && !fetchUsersErrMsg && isUsersDataEmpty;
        if (emptyCondition) {
            setEmptyCaseStatus(true);
        } else {
            setEmptyCaseStatus(false);
        }
    }, [isTableDataLoading, fetchUsersErrMsg, isUsersDataEmpty]);

    // /. effects

    return (
        <div className="table-wrapper">
            <table
                className={`table ${isTableDataLoading ? 'loading' : ''} ${
                    isUsersDataEmpty ? 'empty' : ''
                }`}
            >
                <thead className="table__head sticky">
                    <tr className="table__row table__row--head">
                        {tableHeadTemplate.map(item => {
                            return (
                                <TableHeadTemplate
                                    key={item.id}
                                    {...item}
                                    isTableDataLoading={isTableDataLoading}
                                    isUsersDataEmpty={isUsersDataEmpty}
                                    fetchUsersErrMsg={fetchUsersErrMsg}
                                    dataLength={filteredTableData.length}
                                />
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="table__body">
                    {isTableDataLoading ? (
                        <div className="table__preloader">
                            <Preloader />
                        </div>
                    ) : isError ? (
                        <span className="error-message">
                            Error: {fetchUsersErrMsg}
                        </span>
                    ) : isEmptyCase ? (
                        <span className="message">No matches!</span>
                    ) : (
                        <>
                            {filteredTableData.map(item => {
                                return (
                                    <TableBodyTemplate
                                        key={item.id}
                                        {...item}
                                    />
                                );
                            })}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
