import React from 'react';

import { renderWithProviders } from 'utils/test-utils';

import { initialState as tableState } from 'app/slices/tableSlice';

import UserPage from 'pages/UserPage/UserPage';

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

describe('UserPage component', () => {
    it('should render UserPage with empty cards data', () => {
        const { queryByTestId } = renderWithProviders(<UserPage />);

        expect(queryByTestId('users-list')).toBeNull();
    });
    it('should render UserPage with cards data', async () => {
        const { findAllByTestId } = renderWithProviders(<UserPage />, {
            preloadedState: {
                tableSlice: {
                    ...tableState,
                    isTableDataLoading: false,
                    filteredTableData: mockUsersData
                }
            }
        });

        const usersList = await findAllByTestId(/users-list/i);
        expect(usersList.length).toBe(2);
    });
    it('should display Preloader component', async () => {
        const { findByTestId, queryByTestId, queryByText } =
            renderWithProviders(<UserPage />, {
                preloadedState: {
                    tableSlice: {
                        ...tableState,
                        isTableDataLoading: true
                    }
                }
            });

        const preloaderEl = await findByTestId('preloader');
        expect(preloaderEl).toBeInTheDocument();

        expect(queryByTestId('users-container')).toBeNull();
        expect(queryByText(/Error:/i)).toBeNull();
    });
    it('should display error-markup', async () => {
        const { findByTestId, queryByTestId } = renderWithProviders(
            <UserPage />,
            {
                preloadedState: {
                    tableSlice: {
                        ...tableState,
                        isTableDataLoading: false,
                        fetchUsersErrMsg: 'Error: Failed to fetch'
                    }
                }
            }
        );

        const errorEl = await findByTestId('error');
        expect(errorEl).toBeInTheDocument();

        expect(queryByTestId('preloader')).toBeNull();
        expect(queryByTestId('users-container')).toBeNull();
    });
});
