import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';

import { initialState as tableState } from '../../../app/slices/tableSlice';

import MainPage from './MainPage';

// /. imports

const mockUsersData = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        phone: '1-770-736-8031 x56442',
        email: 'Sincere@april.biz',
        address: { city: 'Gwenborough' },
        birth: '09/06/1965',
        filial: 'Филиал №1',
        status: 'Новая',
        isPaid: true
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        phone: '010-692-6593 x09125',
        email: 'Shanna@melissa.tv',
        address: { city: 'Wisokyburgh' },
        birth: '14/07/2007',
        filial: 'Филиал №2',
        status: 'В обработке',
        isPaid: true
    }
];

describe('MainPage component', () => {
    it('should render text content of result__text when filteredTableData is loading', () => {
        const { getByTestId } = renderWithProviders(<MainPage />);

        expect(getByTestId('counter')).toHaveTextContent('0');
    });
    it('should render text content of result__text when filteredTableData is loaded', () => {
        const { getByTestId } = renderWithProviders(<MainPage />, {
            preloadedState: {
                tableSlice: {
                    ...tableState,
                    isTableDataLoading: false,
                    filteredTableData: mockUsersData
                }
            }
        });

        expect(getByTestId('counter')).toHaveTextContent(
            String(mockUsersData.length)
        );
    });
});
