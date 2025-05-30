import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/SideBar/Sidebar';

function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Replace old aside with AdminSidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '16rem', padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
