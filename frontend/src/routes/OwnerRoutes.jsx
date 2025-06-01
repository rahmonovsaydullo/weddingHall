import React from 'react'
import OwnerCreateVenue from '../pages/Owner/CreateVenue'

function OwnerRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path='add-vanue' element={<OwnerCreateVenue/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default OwnerRoutes
