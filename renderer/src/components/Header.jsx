/* eslint-disable prettier/prettier */

import { useState } from 'react';

const Header = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-6">
      <button
        onClick={toggleSidebar}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <div className="ml-4 flex-1">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">New comment on your article</p>
                  <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">Your article was approved</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-800">System update completed</p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-800">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center focus:outline-none"
          >
            <img className="h-8 w-8 rounded-full object-cover" src="https://via.placeholder.com/32" alt="User" />
            <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
            <svg className="ml-1 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
              <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <div className="border-t border-gray-200 my-1"></div>
              <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;