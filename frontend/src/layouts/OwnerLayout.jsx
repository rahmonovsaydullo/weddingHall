import React from 'react';
import OwnerSidebar from './OwnerSidebar';
import { Outlet } from 'react-router-dom';

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
