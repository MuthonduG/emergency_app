import React from 'react';
import { BiSolidFastForwardCircle } from "react-icons/bi";

function Hero() {
  return (
    <section className="px-8 py-16 md:px-16 lg:px-24 lg:py-20 flex flex-col lg:flex-row justify-between items-center">
      {/* Left Section */}
      <div className="text-center lg:text-left">
        <p className="text-green-600 font-semibold text-sm uppercase mb-2">
          Simplify Emergency Communication for Faster Response
        </p>
        <h1 className="text-4xl font-bold leading-tigh mb-4">
        Stay prepared. Send critical alerts at the click of a button when it matters the most.
        </h1>
        <p className="mb-6">
        In emergencies, every second counts. With our application, you can instantly notify loved ones, medical professionals, or authorities during critical situations like accidents, natural disasters, or medical emergencies. Your safety is just one click away.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition">
            Alert Now - Save Precious Time
          </button>
        </div>
      </div>

      <div className='w-3/5 relative'>
        <img src="/images/bg.jpg" alt="" className='rounded-3xl shadow-xl'/>

        <span className='absolute top-2 left-2 flex items-center gap-3 bg-red-200 text-black p-1 rounded-full transition ease-in-out delay-150 hover:-translate-y-1'>
          quick response
          <BiSolidFastForwardCircle />
        </span>
        <span className='absolute bottom-2 right-2 flex items-center gap-3 bg-red-200 text-black p-1 rounded-full shadow-lg transition ease-in-out delay-150 hover:-translate-y-1'>
          save a life 💝
        </span>
      </div>
    </section>
  )
}

export default Hero

