import React from 'react';

import { Route, Routes } from 'react-router';

import Layout from '../common/Layout';
import MainPage from '../pages/MainPage/MainPage';

import './App.css';
import '../../assets/styles/_style.scss';

// /. imports

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/CodeConstruction-Task" element={<Layout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
