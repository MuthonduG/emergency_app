'use client'

import Navbar from '@/components/Navbar';
import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Faq from '@/components/Faq';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

function Landing() {

  const [isPopup, setIsPopup ] = useState<boolean>(true)
  
  useEffect(()=>{
    const setModal = ()=> {
      window.onload = ()=> {
        return(
          <div className="">
            
          </div>
        )
      }
    }
  }, [])

  return (
    <div className='bg-white'>
      <div className='bg-red-800'>
        <Navbar></Navbar>
        <Hero></Hero>
      </div>
      <About></About>
      <Faq></Faq>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </div>
  )
}

export default Landing;