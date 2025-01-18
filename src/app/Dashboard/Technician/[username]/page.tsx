"use client"

import Sidenav from '@/components/Sidenav';
import React, { useState } from 'react';
import { CgProfile, CgLogOut } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { 
  Chart as ChartJS, 
  ArcElement, Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Filler,
  plugins
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'

// Register the components before using them
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler);

function Technician() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'You have a new message!', time: '1 hour ago', isNew: true },
    { id: 2, message: 'You have a new message!', time: '1 hour ago', isNew: true },
    { id: 3, message: 'You have a new message!', time: '2 hours ago', isNew: true },
  ]);

  const pieData = {
    labels: ["Red", "Yellow", "Purple", "Blue", "Green", "Orange"],
    datasets: [
      {
        label: "# of votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  }

  const labels = ["January", "February", "March", "April", "May", "June", "July"]
  const lineData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgba(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, o.5)"
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend:{
        position: "top" as const
      },
      title: {
        display: true,
        text: "ChartJS Line Chart"
      } 
    }
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isNew: false })));
  };

  return (
    <div className='flex w-screen'>
      <div>
        <Sidenav />
      </div>

      <main className="relative w-full p-4">
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

        {/*Charts */}
        <section className='mt-3'>
          <div className="stats"></div>

          <div className="charts w-full flex gap-6 h-96">
            <div className='bg-gray-200 p-5 w-3/5 rounded-xl'>
              <Line options={options} data={lineData} className=''/>
            </div>
            <div className='bg-gray-200 p-5 w-2/5 rounded-xl flex'>
              <Doughnut data={pieData} className=''/>
              <div>
                <h1 className='mb-3 font-bold text-red-300'>Chart</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              </div>
            </div>
          </div>
        </section>

        {/*Users Data */}
        <section className='mt-5'>
          <div className='mb-3'>
            <h1 className='font-bold text-3xl'>Users Data</h1>
          </div>
          <div className="overflow-x-auto">
              <div className='float-end right-3 p-2 bg-slate-500 mb-2 w-1/4 content-center'>
                <button>delete</button>
              </div>
            <table className="table p-3 bg-gray-200 rounded-xl">
              {/* head */}
              <thead className='bg-red-200 text-gray-600'>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox outline-none border-gray-700" />
                    </label>
                  </th>
                  <th>User</th>
                  <th>Department Role</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox outline-none border-gray-700" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Medical department
                    <br />
                    <span className="badge badge-ghost badge-sm">Nurse</span>
                  </td>
                  <td className='flex gap-1 items-center'>
                    <div className='p-2 bg-red-700 rounded-full w-2 h-2'></div>
                    deactivated
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox outline-none border-gray-700" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Brice Swyre</div>
                        <div className="text-sm opacity-50">China</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    ICT Department
                    <br />
                    <span className="badge badge-ghost badge-sm">ict</span>
                  </td>
                  <td className='flex gap-1 items-center'>
                    <div className='p-2 bg-green-700 rounded-full w-2 h-2'></div>
                    Active
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox outline-none border-gray-700" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Marjy Ferencz</div>
                        <div className="text-sm opacity-50">Russia</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Security
                    <br />
                    <span className="badge badge-ghost badge-sm">Head of Security</span>
                  </td>
                  <td className='flex gap-1 items-center'>
                    <div className='p-2 bg-green-700 rounded-full w-2 h-2'></div>
                    Active
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

      </main>
    </div>
  )
}

export default Technician;
