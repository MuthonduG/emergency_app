'use client';

import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Faq from '@/components/Faq';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';

function Landing() {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    // Show the popup when the component mounts
    setIsPopupVisible(true);

    // Optional: Add event listener for 'Escape' key to close the popup
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPopupVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  // Optional: Close popup when clicking outside of it
  // const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   // Prevent closing when clicking inside the popup
  //   event.stopPropagation();
  //   handleClosePopup();
  // };

  return (
    <div className="bg-white relative">
      <div className="bg-red-800">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Faq />
      <ContactUs />
      <Footer />

      {isPopupVisible && (
        // Backdrop Overlay
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClosePopup} // Optional: Close when clicking on the backdrop
        >
          {/* Popup Container */}
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-between items-center w-full">
                <p className="text-lg font-semibold text-slate-800 uppercase">Send an alert!</p>
                <button
                  onClick={handleClosePopup}
                  type="button"
                  className="text-gray-500 hover:text-gray-700 text-3xl font-semibold"
                  aria-label="Close Popup"
                >
                  &times;
                </button>
              </div>
              {/* Add more content here if needed */}
              <div className="grid grid-cols-2 justify-center items-center gap-10">
                <button type='button' className='p-3 rounded-xl bg-red-600'> Medical Alert </button>
                <button type='button' className='p-3 rounded-xl bg-red-600'> ICT Alert </button>
                <button type='button' className='p-3 rounded-xl bg-red-600'> Security Alert </button>
                <button type='button' className='p-3 rounded-xl bg-red-600'> Fire Alert </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
