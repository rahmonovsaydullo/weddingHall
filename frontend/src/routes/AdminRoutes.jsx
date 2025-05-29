import React from 'react'
import AdminCreateVenue from '../pages/Admin/AddVenue'
import AllVenues from '../pages/Admin/AllVenues'
import CreateOwner from '../pages/Admin/CreateOwner'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="add-venue" element={<AdminCreateVenue />} />
          <Route path="all-venues" element={<AllVenues />} />
          <Route path="add-owner" element={<CreateOwner />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes
