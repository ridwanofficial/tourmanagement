import React from 'react'
import Sidebar from './components/Sidebar'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecentTours from './pages/RecentTours'
import Admin from './pages/Admin'
import TourDetailsList from './components/admin/TourDetailsList'
import EditTourDetailsForm from './components/admin/EditTourDetailsForm'
import SingleTour from './pages/SingleTour'
import { TOUR_DETAILS_CONST } from './constant'
import TourForm from './components/admin/TourForm'
import TourList from './components/admin/TourList'
import GuideList from './components/admin/GuideList'
import GuideForm from './components/admin/GuideForm'

function App () {
  return (
    <BrowserRouter>
      <div>
        <Sidebar />
        <Routes>
          <Route path='/' element={<RecentTours />} />
          <Route path='/tour/:id' element={<SingleTour />} />
          <Route path='/admin' element={<Admin />} />
          <Route exact path={`admin/tours`} element={<TourList />} />
          <Route exact path={`admin/guides`} element={<GuideList />} />
          <Route
            exact
            path={`admin/tour-details`}
            element={<TourDetailsList />}
          />
          <Route
            exact
            path={`admin/tour-details`}
            element={<TourDetailsList />}
          />
          <Route
            path={`/admin/tour-details/:id/edit`}
            element={<EditTourDetailsForm mode={TOUR_DETAILS_CONST.EDIT} />}
          />
          <Route
            path={`/admin/guides/:id/edit`}
            element={<GuideForm mode={TOUR_DETAILS_CONST.EDIT} />}
          />
          <Route
            path={`/admin/tour-details/:id`}
            element={<EditTourDetailsForm mode={TOUR_DETAILS_CONST.VIEW} />}
          />
          <Route
            path={`/admin/create-tour-details`}
            element={<EditTourDetailsForm mode={TOUR_DETAILS_CONST.NEW} />}
          />
          <Route
            path={`/tour/:id/edit`}
            element={<TourForm mode={TOUR_DETAILS_CONST.EDIT} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
