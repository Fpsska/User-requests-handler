import React, { useState } from 'react';

import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

// /. imports

interface propTypes {
    id: number,
    name: string,
    birth: string,
    phone: string,
    filial: string,
    isPaid: boolean,
    status: string
}

// /. interfaces

const TableBodyTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        name,
        birth,
        phone,
        filial,
        isPaid,
        status
    } = props;

    const [statuses] = useState<{ [key: string]: string }>({
        'Закрыта': 'close',
        'Новая': 'active',
        'В обработке': 'progress'
    });


    return (
        <>
            <tr key={id} className="table__row">
                <td className="table__cell table__cell--id">{id}</td>
                <td className="table__cell table__cell--name">{name}</td>
                <td className="table__cell table__cell--birth">{birth}</td>
                <td className="table__cell table__cell--phone">{phone}</td>
                <td className="table__cell table__cell--filial">{filial}</td>
                <td className="table__cell table__cell--paid">
                    {isPaid
                        ? <IoCheckmarkCircleOutline size={'24px'} color={'green'} />
                        : <IoCloseCircleOutline size={'24px'} color={'red'} />}
                </td>
                <td className={`table__cell table__cell--status ${statuses[status]}`}>
                    {status}
                </td>
            </tr>
        </>
    );
};

export default TableBodyTemplate;