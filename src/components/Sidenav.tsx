import React from 'react';
import { FaGaugeHigh } from "react-icons/fa6";
import { BsFillBuildingFill } from "react-icons/bs";
import { FaMicrochip } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

function Sidenav() {
  return (
    <div className="group sticky top-0 left-0 bottom-0 h-screen bg-[#961f1f] text-white flex flex-col items-center py-4 w-[70px] hover:w-[240px] transition-all duration-300">
      {/* Logo */}
      <div className='p-4 w-full block justify-center items-center'>
        <img src="/images/logo.png" alt="" className='rounded-full'/>
        <h3 className='text-xl font-bold content-center hidden group-hover:block'>QuickAid</h3>
      </div>
      <div className="h-[90px] w-full p-4"></div>
      {/* Menu Items */}
      <ul className="flex flex-col items-center w-full space-y-2">
        <li className="w-full">
          <a href="/Dashboard" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#dba0a0] transition-all duration-300">
            <FaGaugeHigh className="text-lg" />
            <span className="text-lg font-medium whitespace-nowrap hidden group-hover:block">Dashboard</span>
          </a>
        </li>
        <li className="w-full">
          <a href="/Technician" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#dba0a0] transition-all duration-300">
            <BsFillBuildingFill className="text-lg" />
            <span className="text-lg font-medium whitespace-nowrap hidden group-hover:block">Technician</span>
          </a>
        </li>
        <li className="w-full">
          <a href="/Department" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#dba0a0] transition-all duration-300">
            <BsFillBuildingFill className="text-lg" />
            <span className="text-lg font-medium whitespace-nowrap hidden group-hover:block">Department</span>
          </a>
        </li>
        <li className="w-full">
          <a href="/Device" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#dba0a0] transition-all duration-300">
            <FaMicrochip className="text-lg" />
            <span className="text-lg font-medium whitespace-nowrap hidden group-hover:block">Device</span>
          </a>
        </li>
        <li className="w-full">
          <a href="/Location" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#dba0a0] transition-all duration-300">
            <FaMicrochip className="text-lg" />
            <span className="text-lg font-medium whitespace-nowrap hidden group-hover:block">Location</span>
          </a>
        </li>
        <li className="w-full">
          <a href="/Profile" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#dba0a0] transition-all duration-300">
            <FaUserAlt className="text-lg" />
            <span className="text-lg font-medium whitespace-nowrap hidden group-hover:block">Profile</span>
          </a>
        </li>
        <li className="w-full">
          <a href="/Setting" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#dba0a0] transition-all duration-300">
            <IoMdSettings className="text-lg" />
            <span className="text-lg font-medium whitespace-nowrap hidden group-hover:block">Settings</span>
          </a>
        </li>
        <li className="absolute bottom-0 w-full mt-auto">
          <a href="/Logout" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#dba0a0] transition-all duration-300">
            <TbLogout className="text-lg" />
            <span className="text-lg font-medium whitespace-nowrap hidden group-hover:block">LogOut</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidenav;
