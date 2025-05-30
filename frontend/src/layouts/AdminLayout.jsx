import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '220px',
        background: '#222',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <h2 style={{ color: '#00ff99' }}>Admin Panel</h2>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/admin/add-venue" style={{ color: 'white', textDecoration: 'none' }}>Add Venue</Link>
        <Link to="/admin/all-venues" style={{ color: 'white', textDecoration: 'none' }}>All Venues</Link>
        <Link to="/admin/add-owner" style={{ color: 'white', textDecoration: 'none' }}>Add Owner</Link>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '30px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
