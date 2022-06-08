import React from 'react';

import { Outlet } from 'react-router';

// /. imports

export const Layout: React.FC = () => {
    return (
        <div className="page">
            <header></header>
            <main className="main">
                <Outlet />
            </main>
            <footer></footer>
        </div>
    );
};
