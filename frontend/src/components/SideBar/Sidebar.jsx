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
    { to: '/admin/all-venues', label: 'All Venues', icon: faBuilding },
    { to: '/admin/all-owners', label: 'All Owners', icon: faUsers },
    { to: '/admin/bookings', label: 'All Bookings', icon: faCalendarCheck },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 shadow-xl fixed top-0 left-0 flex flex-col">
      <div className="py-6 px-6 text-center font-bold text-3xl text-rose-800 border-b border-rose-300 tracking-wide">
        Admin Panel
      </div>
      <nav className="flex flex-col flex-grow mt-6 gap-2 px-3">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 text-rose-800 rounded-xl transition-all duration-200 
              hover:bg-rose-100 hover:shadow-md 
              ${isActive ? 'bg-white shadow-lg border border-rose-300 font-semibold' : 'bg-transparent'}`
            }
          >
            <FontAwesomeIcon icon={icon} className="text-rose-500" />
            <span className="text-lg">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
