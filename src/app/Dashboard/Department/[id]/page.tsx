"use client"

import React, { useState } from 'react';
import Sidenav from '@/components/Sidenav';
import { CgProfile, CgLogOut } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";

function Department() {
      const [notifications, setNotifications] = useState([
        { id: 1, message: 'You have a new message!', time: '1 hour ago', isNew: true },
        { id: 2, message: 'You have a new message!', time: '1 hour ago', isNew: true },
        { id: 3, message: 'You have a new message!', time: '2 hours ago', isNew: true },
      ]);

      const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, isNew: false })));
      };


  return (
    <div className='flex w-screen'>
      <div>
        <Sidenav />
      </div>

      <main className="relative w-full p-4 bg-green-300">
        {/*Navbar */}
        <header className="navbar bg-gray-200 rounded-lg">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Dashboard</a>
          </div>

          <div className="flex-none gap-4">
            <div className="form-control">
              <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>

             {/* Notifications Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <IoNotifications className='h-5 w-5'/>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content mt-3 w-80 bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-500">
                  You have {notifications.filter((n) => n.isNew).length} unread messages.
                </p>

                <div className="mt-3">
                  {/* Notification Items */}
                  <ul className="space-y-3">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className={`flex justify-between items-start p-2 rounded-md ${
                          notification.isNew ? 'bg-gray-00' : ''
                        }`}
                      >
                        <div>
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        {notification.isNew && <span className="h-2 w-2 bg-blue-500 rounded-full mt-1"></span>}
                      </li>
                    ))}
                  </ul>
                  {/* Mark All as Read */}
                  <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={markAllAsRead}
                  >
                    ✓ Mark all as read
                  </button>
                </div>
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white">
                <li>
                  <a className="flex gap-3">
                    <CgProfile />
                    Profile
                  </a>
                </li>
                <li>
                  <a className='flex gap-3'>
                    <CgLogOut />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>


      </main>
    </div>
  )
}

export default Department
