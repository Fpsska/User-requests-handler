import React, { useEffect, useState } from 'react';

import { FaSortDown } from 'react-icons/fa';

import { TiArrowSortedUp } from 'react-icons/ti';

import { useAppDispatch } from 'app/hooks';

import { sortUsersByASC, sortUsersByDSC } from 'app/slices/tableSlice';

// /. imports

interface propTypes {
    name: string;
    text: string;
    isTableDataLoading: boolean;
    isUsersDataEmpty: boolean;
    fetchUsersErrMsg: string | null;
    dataLength: number;
}

// /. interfaces

const TableHeadTemplate: React.FC<propTypes> = props => {
    const {
        name,
        text,
        isTableDataLoading,
        isUsersDataEmpty,
        fetchUsersErrMsg,
        dataLength
    } = props;

    const [sortOder, setSetOrder] = useState<string>('DSC');
    const [isValidCondition, setValidConditionStatus] =
        useState<boolean>(false);
    const [statuses, setStatus] = useState<{ [key: string]: boolean }>({
        id: false,
        fio: false,
        birth: false,
        phone: false,
        filial: false,
        isPaid: false,
        status: false
    });

    const dispatch = useAppDispatch();

    // /. hooks

    const iconHandler = (name: string): void => {
        switch (name) {
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
            default:
                return;
        }
    };

    const sortUsersData = (name: string): void => {
        if (sortOder === 'DSC') {
            setSetOrder('ASC');
            dispatch(sortUsersByDSC({ sortOpt: name }));
        } else if (sortOder === 'ASC') {
            setSetOrder('DSC');
            dispatch(sortUsersByASC({ sortOpt: name }));
        }
        iconHandler(name);
    };

    // /. functions

    useEffect(() => {
        const validCondition =
            !isTableDataLoading &&
            !fetchUsersErrMsg &&
            !isUsersDataEmpty &&
            dataLength > 1;

        if (validCondition) {
            setValidConditionStatus(true);
        } else {
            setValidConditionStatus(false);
        }
    }, [isTableDataLoading, isUsersDataEmpty, fetchUsersErrMsg, dataLength]);

    return (
        <th
            className="table__col table__col--head"
            onClick={() => isValidCondition && sortUsersData(name)}
        >
            {text}
            <>
                {sortOder === 'ASC' ? (
                    <TiArrowSortedUp data-testid="arrow-up" />
                ) : (
                    <FaSortDown data-testid="arrow-down" />
                )}
            </>
        </th>
    );
};

export default TableHeadTemplate;
