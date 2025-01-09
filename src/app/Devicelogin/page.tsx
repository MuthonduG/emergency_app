'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginDevice, loginUser  } from '../../utils/api';

function Devicelogin() {
  const router = useRouter();
  const [devicesernum, setdevicesernum] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginDevice ({ devicesernum, password });
      // Handle successful login (e.g., store token, redirect)
      console.log('Login successful:', response);
      router.push('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      setError('Invalid devicesernum or password');
      console.error('Login error:', error);
    }
  };

  return (
    <section className="h-screen bg-red-200">
      <div className="flex justify-center items-center p-3 h-screen">
        <div className="flex content-center items-center gap-10 bg-amber-50 h-2/3 w-2/3 rounded-lg">
          <div className="w-1/2 h-full">
            <img src="/images/auth.jpeg" alt="auth img" className="h-full w-full rounded-lg" />
          </div>

          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="/images/logo.png"
                className="mx-auto h-10 w-auto rounded-lg"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-red-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="devicesernum" className="block text-sm/6 font-medium text-gray-900">
                    Device Serial Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="devicesernum"
                      name="devicesernum"
                      type="devicesernum"
                      required
                      autoComplete="devicesernum"
                      value={devicesernum}
                      onChange={(e) => setdevicesernum(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
 <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                     Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Are you a Normal User?{' '}
                <button 
                  className="font-semibold text-red-900 hover:text-red-500"
                  onClick={() => router.push('/Login')}
                >
                  Login 
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>   
    </section>
  )
}

export default Devicelogin;