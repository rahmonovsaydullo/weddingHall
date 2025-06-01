import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, LogOut } from 'lucide-react';

const navItems = [
  { to: '/owner/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
  { to: '/owner/add-vanue', label: 'Create Venue', icon: <PlusCircle size={18} /> },
  { to: '/owner/venues', label: 'My Venues', icon: <PlusCircle size={18} /> },
  { to: '/logout', label: 'Logout', icon: <LogOut size={18} /> },
];

const OwnerSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-pink-100 shadow-lg p-5 fixed top-0 left-0 hidden md:block">
      <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">Owner Panel</h2>
      <nav className="space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isActive ? 'bg-pink-600 text-white' : 'text-pink-800 hover:bg-pink-200'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default OwnerSidebar;
