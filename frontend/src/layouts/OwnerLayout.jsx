import React from 'react';
import { Outlet } from 'react-router-dom';
import OwnerSidebar from '../components/OwnerSidebar/OwnerSidebar';

const OwnerLayout = () => {
  return (
    <div className="flex">
      <OwnerSidebar />
      <main className="ml-64 p-6 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
