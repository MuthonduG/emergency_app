import React from 'react';
import { MdLogout } from "react-icons/md";

function Navbar() {
  return (
    <header className="flex justify-center items-center">
        {/* <div className="navbar bg-red-800 w-4/5 rounded-3xl">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">astroAid</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex justify-center items-center">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Contact Us</a>
                    </li>
                    <li>
                        <a href="#">Send Alert</a>
                    </li>
                    <li>
                        <button className='btn'>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div> */}

        <div className="navbar">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">astroAID</a>
            </div>
            <div className="navbar-center">
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 flex justify-center items-center">
                        <li>
                            <a href="@/components/Hero">Home</a>
                        </li>
                        <li>
                            <a href="@/components/About">About</a>
                        </li>
                        <li>
                            <a href="@/components/ContactUs">Contact Us</a>
                        </li>
                        {/* <li>
                            <a href="./Alert-message/page">Send Alert</a>
                        </li> */}
                    </ul>
                </div>
            </div>
            <div className="navbar-end">
                <button className="btn flex">
                    <MdLogout className='text-xl'></MdLogout>
                    Logout
                </button>
            </div>
        </div>
    </header>
  )
}

export default Navbar