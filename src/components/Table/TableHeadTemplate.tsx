import React, { useEffect, useState } from 'react';

import { FaSortDown } from 'react-icons/fa';

import { TiArrowSortedUp } from 'react-icons/ti';

import { useAppDispatch } from '../../app/hooks';

import { sortUsersByASC, sortUsersByDSC } from '../../app/slices/tableSlice';

// /. imports

interface propTypes {
    name: string,
    text: string,
    isTableDataLoading: boolean,
    isUsersDataEmpty: boolean
}

interface statusTypes {
    [key: string]: boolean
}

// /. interfaces

const TableHeadTemplate: React.FC<propTypes> = (props) => {

    const {
        name,
        text,
        isTableDataLoading,
        isUsersDataEmpty
    } = props;

    const [sortOder, setSetOrder] = useState<string>('DSC');
    const [statuses, setStatus] = useState<statusTypes>(
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
        <th className="table__col table__col--head" onClick={() => sortUsersData(name)}>
            {text}
            {!isTableDataLoading && !isUsersDataEmpty && statuses[name] ? <TiArrowSortedUp /> : <FaSortDown />}
        </th>
    );
};

export default TableHeadTemplate;