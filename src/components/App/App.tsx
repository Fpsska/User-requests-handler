import React from 'react';

import { Route, Routes } from 'react-router';

import Layout from '../common/Layout';
import MainPage from '../pages/MainPage/MainPage';
import UserPage from '../pages/UserPage/UserPage';
import PostPage from '../pages/PostsPage/PostPage';

import './App.css';
import '../../assets/styles/_style.scss';
import '../../assets/styles/_media.scss';

// /. imports

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="Users" element={<UserPage />} />
          <Route path="Posts" element={<PostPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
