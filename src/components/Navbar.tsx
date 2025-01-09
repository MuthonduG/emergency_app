import React from 'react';
import Image from 'next/image';

function Navbar() {
  return (
    <nav className='w-screen bg-green-300 flex justify-center items-center'>
      <div className='bg-violet-500 w-9/12 p-3  flex justify-between items-center'>
        <div className='logo flex gap-2 items-center'>
          <Image
          src="/images/logo.png"
          alt="logo"
          width={40}
          height={40}
          className='rounded-full'
          />

          <h3 className='text-2xl font-bold text-red-900'>
            Quick
            <span className='text-orange-700'>Aid</span>
          </h3>
        </div>

        <div>
          <ul className='flex gap-5'>
            <li>
              <a href="#" className=''>Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
          </ul>
        </div>

        <div>
          <button>Login</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar