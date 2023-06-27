import React from 'react'
import Sidebar from './components/Sidebar'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecentTours from './pages/RecentTours'
import TourDetails from './pages/TourDetails'
import Admin from './pages/Admin'
import TourList from './components/admin/TourList'
import EditTourForm from './components/admin/EditTourForm'

function App () {
  return (
    <BrowserRouter>
      <div>
        <Sidebar />
        <Routes>
          <Route path='/' element={<RecentTours />} />
          <Route path='/tour-details/:id' element={<TourDetails />} />
          <Route path='/admin' element={<Admin />} />
          <Route exact path={`admin/tours`} element={<TourList />} />
          {/* <Route path={`admin/tours/new`}>
            <TourForm />
          </Route>
          <Route path={`admin/tours/:tourId/edit`}>
            <TourForm />
          </Route> */}

          <Route path={`/tour-details/:id/edit`} element={<EditTourForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
