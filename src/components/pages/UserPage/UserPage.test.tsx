import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import * as reduxAppHooks from '../../../app/hooks';

import UserPage from './UserPage';

// /. imports

const mockedUseSelector = jest.spyOn(reduxAppHooks, 'useAppSelector');

const mockUsersData = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        phone: '1-770-736-8031 x56442',
        email: 'Sincere@april.biz',
        city: 'Gwenborough'
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        phone: '010-692-6593 x09125',
        email: 'Shanna@melissa.tv',
        city: 'Wisokyburgh'
    }
];

describe('UserPage component', () => {
    it('should create UserPage with empty posts data', () => {
        mockedUseSelector.mockReturnValue([]);

        const component = render(<UserPage />);
        expect(component).toMatchSnapshot();

        expect(screen.queryByRole('list')).toBeNull(); // not.toBeInTheDocument()
    });
    it('should create UserPage with posts data', () => {
        mockedUseSelector.mockReturnValue(mockUsersData);

        const component = render(<UserPage />);
        expect(component).toMatchSnapshot();

        waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument()); // waiting for all state updates
    });
});
