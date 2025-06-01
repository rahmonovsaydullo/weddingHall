import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import AdminCreateVenue from '../pages/Admin/AddVenue'
import AllVenues from '../pages/Admin/AllVenues'
import CreateOwner from '../pages/Admin/CreateOwner'
import AdminDashboard from '../pages/Admin' // this is index.jsx
import ApproveVenue from '../pages/Admin/ApproveVenue'
import AllBooking from '../pages/Admin/AllBooking'
import AllOwners from '../pages/Admin/AllOwners'

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="add-venue" element={<AdminCreateVenue />} />
        <Route path="all-venues" element={<AllVenues />} />
        <Route path="add-owner" element={<CreateOwner />} />
        <Route path="all-owners" element={<AllOwners />} />
        <Route path="approve-venue" element={<ApproveVenue />} />
        <Route path="all-booking" element={<AllBooking />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
