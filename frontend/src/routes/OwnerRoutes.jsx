import React from 'react'
import OwnerCreateVenue from '../pages/Owner/CreateVenue'
import { Route, Routes } from 'react-router-dom'
import OwnerLayout from '../layouts/OwnerLayout';
import OwnerDashboard from '../pages/Owner';
import OwnVanues from '../pages/Owner/OwnVenues';
import UpdateVenue from '../pages/Owner/UpdateVenue';
import AllBooking from '../pages/Owner/AllBooking';

function OwnerRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path='add-vanue' element={<OwnerCreateVenue />} />
          <Route path='own-venues' element={<OwnVanues />} />
          <Route path="edit-venue/:id" element={<UpdateVenue />} />
          <Route path="all-booking" element={<AllBooking />} />
        </Route>
      </Routes>
    </div>
  )
}

export default OwnerRoutes
