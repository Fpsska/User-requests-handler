import React, { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router';

import Layout from 'components/layout/Layout';

import Preloader from 'components/ui/Preloader/Preloader';

import 'assets/styles/_media.scss';
import 'assets/styles/style.scss';
import 'assets/styles/_theme.scss';
import 'assets/styles/_reset.scss';
import './App.css';

// /. imports

const MainPageLazy = lazy(() => import('pages/MainPage/MainPage'));
const UserPageLazy = lazy(() => import('pages/UserPage/UserPage'));

const PostPageLazy = lazy(() => {
    return Promise.all([
        import('pages/PostPage/PostPage'),
        new Promise(resolve => setTimeout(resolve, 1700))
    ]).then(([moduleExports]) => moduleExports);
});

// /. lazy

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="CodeConstruction-Task"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={
                            <Suspense>
                                <MainPageLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="Users"
                        element={
                            <Suspense>
                                <UserPageLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="Posts"
                        element={
                            <Suspense
                                fallback={
                                    <div className="fallback-loader">
                                        <Preloader />
                                    </div>
                                }
                            >
                                <PostPageLazy />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
