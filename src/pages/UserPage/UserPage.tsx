import React, { useState, useEffect } from 'react';

import Preloader from 'components/ui/Preloader/Preloader';

import { useAppSelector } from 'app/hooks';

import './userPage.scss';

// /. imports

const UserPage: React.FC = () => {
    const { isTableDataLoading, fetchUsersErrMsg, filteredTableData } =
        useAppSelector(state => state.tableSlice);

    const [isError, setErrorStatus] = useState<boolean>(false);

    // /. hooks

    useEffect(() => {
        if (!isTableDataLoading && fetchUsersErrMsg) {
            setErrorStatus(true);
        } else {
            setErrorStatus(false);
        }
    }, [isTableDataLoading, fetchUsersErrMsg]);

    // /. effects

    return (
        <section className="user-page">
            <div className="user-page__wrapper">
                {isTableDataLoading ? (
                    <div
                        className="user-page__preloader"
                        data-testid="preloader"
                    >
                        <Preloader />
                    </div>
                ) : isError ? (
                    <span
                        className="error-message"
                        data-testid="error"
                    >
                        Error: {fetchUsersErrMsg}
                    </span>
                ) : (
                    <div
                        className="users"
                        data-testid="users-container"
                    >
                        {filteredTableData.map((item, idx) => {
                            return (
                                <ul
                                    className="user"
                                    key={item.id}
                                    data-testid={`users-list-${idx}`}
                                >
                                    <li className="user__information">
                                        Name: <span>{item.name}</span>
                                    </li>
                                    <li className="user__information">
                                        Username: <span>{item.username}</span>
                                    </li>
                                    <li className="user__information">
                                        Phone: <span>{item.phone}</span>
                                    </li>
                                    <li className="user__information">
                                        Email: <span>{item.email}</span>
                                    </li>
                                    <li className="user__information">
                                        City: <span>{item.address.city}</span>
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserPage;
