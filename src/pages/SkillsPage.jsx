import React from 'react'
import DesktopNavbar from '../components/DesktopNavbar'
import MobileNavbar from '../components/MobileNavbar'


const SkillsPage = () => {
  return (
   <div className='bg-gray-950 h-[100vh] flex flex-col items-center text-white font-mono'>
      <DesktopNavbar/>
      <p>skills page</p>
      <MobileNavbar/>
    </div>
  )
}

export default SkillsPage