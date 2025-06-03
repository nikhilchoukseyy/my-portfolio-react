import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import avatarPhoto from '../assets/github-profile-photo.jpeg'
import { Download } from 'lucide-react';
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import MobileNavbar from '../components/MobileNavbar';
import DesktopNavbar from '../components/DesktopNavbar';

const HomePage = () => {
  return (
    <div className='bg-gray-950 h-[100vh] flex flex-col items-center text-white font-mono'>
        <DesktopNavbar/>
      <div className='flex flex-col items-center justify-center text-center h-auto gap-12 md:gap-8'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          className="w-32 h-32 md:h-64 md:w-64 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg"
        >
          <img
            src={avatarPhoto}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full border-4 border-white"
          />
        </motion.div>
        <div className='h-auto w-auto flex flex-col md:flex-row md:items-baseline items-center justify-center gap-1 md:gap-2'>
          <h1 className='text-3xl md:text-4xl font-bold'>Hello I am</h1>

          <div
            className='h-[40px] md:h-[48px] text-center md:text-left text-2xl font-thin md:text-4xl text-blue-500 overflow-hidden'
            style={{ minWidth: '360px' }}
          >
            <Typewriter
              words={[' Nikhil chouksey', ' a web developer', ' a problem solver']}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={3000}
            />
          </div>
        </div>


        <button className="flex flex-row bg-white bg-opacity-80 rounded-full px-4 py-2 text-black font-extrabold  transition transform duration-300 hover:bg-white hover:shadow-sm hover:shadow-blue-300 hover:bg-opacity-100 cursor-pointer  md:mt-4 md:mb-4 ">
          <a className="flex flex-row gap-2 "
            href=""
            download="Nikhil_Chouksey_Resume">
            <span>Download Resume</span>
            <Download className='hover:translate-y-1 transition duration-300' />
          </a>
        </button>
        <div className=' flex flex-row gap-4  '>
          <button className='text-2xl hover:-translate-y-1 transition duration-300'><FaGithub /></button>
          <button className='text-2xl hover:-translate-y-1 transition duration-300'><CiLinkedin /></button>
          <button className='text-2xl hover:-translate-y-1 transition duration-300'><MdOutlineEmail /></button>
        </div>
      </div>
      <MobileNavbar/>
    </div>
  )
}

export default HomePage; 