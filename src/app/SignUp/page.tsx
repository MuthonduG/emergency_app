'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser  } from '../../utils/api';

function Signup() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    userid: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser (userData);
      console.log('Registration successful:', response);
      router.push('/Login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <section className="h-screen bg-red-200">
      <div className='flex justify-center items-center p-3 h-screen'>
        <div className='flex content-center items-center gap-10 bg-amber-50 h-2/3 w-2/3 rounded-lg'>
          <div className='w-1/2 h-full'>
            <img src="/images/auth.jpeg" alt="auth img" className='h-full w-full rounded-lg'/>
          </div>

          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="/images/logo.png"
                className="mx-auto h-10 w-auto rounded-lg"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-red-900">
                Create account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="userid" className="block text-sm/6 font-medium text-gray-900">
                    User ID
                  </label>
                  <div className="mt-2">
                    <input
                      id="userid"
                      name="userid"
                      type="number"
                      value={userData.userid}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                    Phone number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      value={userData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?{' '}
                <button
                  className="font-semibold text-red-900 hover:text-red-500"
                  onClick={() => router.push('/Login')}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>   
    </section>
  );
}

export default Signup;