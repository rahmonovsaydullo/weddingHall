import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  faPlus,
  faBuilding,
  faUsers,
  faCalendarCheck,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminSidebar = () => {
  const links = [
    { to: '/admin/add-venue', label: 'Add Venue', icon: faPlus },
    { to: '/admin/add-owner', label: 'Add Owner', icon: faUserPlus },
    { to: '/admin/venues', label: 'See All Venues', icon: faBuilding },
    { to: '/admin/owners', label: 'See All Owners', icon: faUsers },
    { to: '/admin/bookings', label: 'See All Bookings', icon: faCalendarCheck },
  ];

  return (
    <aside className="w-64 min-h-screen bg-pink-100 shadow-lg fixed top-0 left-0 flex flex-col">
      <div className="py-6 px-6 text-center font-bold text-2xl text-pink-700 border-b border-pink-300">
        Admin Panel
      </div>
      <nav className="flex flex-col flex-grow mt-4">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-pink-700 hover:bg-pink-300 transition
              ${isActive ? 'bg-pink-300 font-semibold rounded-r-lg' : 'font-normal'}`
            }
          >
            <FontAwesomeIcon icon={icon} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
