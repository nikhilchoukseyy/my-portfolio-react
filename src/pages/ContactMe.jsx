import React from 'react'
import DesktopNavbar from '../components/DesktopNavbar'
import MobileNavbar from '../components/MobileNavbar'


const ContactMe = () => {
  return (
    <div className='bg-gray-950 h-[100vh] flex flex-col items-center text-white font-mono'>
      <DesktopNavbar/>
      <p>Contact page</p>
      <MobileNavbar/>
    </div>
    
  )
}

export default ContactMe