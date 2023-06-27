import React from 'react'
import Sidebar from './components/Sidebar'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecentTours from './pages/RecentTours'
import Admin from './pages/Admin'
import TourDetailsList from './components/admin/TourDetailsList'
import EditTourDetailsForm from './components/admin/EditTourDetailsForm'
import SingleTour from './pages/SingleTour'

function App () {
  return (
    <BrowserRouter>
      <div>
        <Sidebar />
        <Routes>
          <Route path='/' element={<RecentTours />} />
          <Route path='/tour/:id' element={<SingleTour />} />
          <Route path='/admin' element={<Admin />} />
          <Route
            exact
            path={`admin/tour-details`}
            element={<TourDetailsList />}
          />
          <Route
            path={`/tour-details/:id/edit`}
            element={<EditTourDetailsForm editMode={true} />}
          />
          <Route
            path={`/tour-details/:id`}
            element={<EditTourDetailsForm editMode={false} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
