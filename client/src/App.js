import React from 'react'
import Sidebar from './components/Sidebar'

import { BrowserRouter, Route,Routes } from 'react-router-dom';
import RecentTours from './pages/RecentTours';
import TourDetails from './pages/TourDetails';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<RecentTours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
