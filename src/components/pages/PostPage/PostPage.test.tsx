import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import * as reduxAppHooks from '../../../app/hooks';

import PostPage from './PostPage';

// /. imports

const mockedUseSelector = jest.spyOn(reduxAppHooks, 'useAppSelector');

const mockPostData = [
    {
        id: 1,
        userId: 1,
        title: 'sunt aut facere',
        body: 'quia et suscipit suscipit recusandae consequuntur'
    },
    {
        id: 2,
        userId: 2,
        title: 'qui est esse',
        body: 'reprehenderit molestiae ut ut quas totam nostrum rerum'
    }
];

describe('PostPage component', () => {
    it('should create PostPage with empty posts data', () => {
        mockedUseSelector.mockReturnValue([]);

        const component = render(<PostPage />);
        expect(component).toMatchSnapshot();

        expect(screen.queryByRole('list')).toBeNull(); // not.toBeInTheDocument()
    });
    it('should create PostPage with posts data', () => {
        mockedUseSelector.mockReturnValue(mockPostData);

        const component = render(<PostPage />);
        expect(component).toMatchSnapshot();

        waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument()); // waiting for all state updates
    });
});
