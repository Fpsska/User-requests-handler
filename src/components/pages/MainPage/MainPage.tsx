import React, { useEffect } from 'react';

import { useAppDispatch } from '../../../app/hooks';

import Form from '../../Form/Form';
import Table from '../../Table/Table';

import { fetchUsersData } from '../../../app/slices/tableSlice';

// /. imports

const MainPage: React.FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsersData());
    }, []);

    return (
        <div>
            <Form />
            <Table />
        </div>
    );
};

export default MainPage;
