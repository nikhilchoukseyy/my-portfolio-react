import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import avatarPhoto from '../assets/github-profile-photo.jpeg'
import { Download } from 'lucide-react';
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import MobileNavbar from '../components/MobileNavbar';
import DesktopNavbar from '../components/DesktopNavbar';
import FadeInUpAnimation from '../hooks/FadeInUpAnimation';


const HomePage = () => {

  return (
    <div className='bg-gray-950 min-h-screen w-full overflow-x-hidden flex flex-col items-center text-white font-mono gap-4'>
      <DesktopNavbar />
      <div className='flex flex-col items-center justify-center text-center gap-8 mt-24 md:mt-24 md:gap-4'>
        <motion.div
          variants={FadeInUpAnimation}
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          className="w-32 md:h-64 md:w-64 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg"
        >
          <img
            src={avatarPhoto}
            alt="Avatar"
            className="w-full object-cover rounded-full border-4 border-white"
          />
        </motion.div>
        <div className='h-auto w-auto flex flex-col md:flex-row md:items-baseline items-center justify-evenly gap-2 mt-2 mb-20 md:mb-0 '>
          <h1 className='text-3xl md:text-4xl font-bold  '>Hello I am</h1>
          <span
            className='h-auto md:h-[48px] text-center md:text-left text-2xl font-thin md:text-2xl text-blue-500 overflow-hidden md:min-w-[230px]'
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
          </span>
        </div>

        <motion.button
          className="bg-white rounded-full px-4 py-2 text-black font-extrabold  transitionhover:bg-white hover:shadow-sm hover:shadow-blue-500 hover:bg-opacity-100 cursor-pointer  md:mt-4 md:mb-4 hover:scale-105 md:hover:scale-100">
          <a className="flex flex-row gap-2 ">
            <span>Download Resume</span>
            <Download className='hover:translate-y-1 transition duration-300' />
          </a>
        </motion.button>
        <motion.div
          variants={FadeInUpAnimation}
          initial="hidden"
          animate="show"
          className=' flex flex-row gap-4  '>
          <motion.button
            drag
            dragConstraints={{ top: 0, left: 0, bottom: 0, right: 0 }}
            dragElastic={2}
            className='text-2xl hover:-translate-y-1 transition duration-100'><FaGithub /></motion.button>
          <motion.button
            drag
            dragConstraints={{ top: 0, left: 0, bottom: 0, right: 0 }}
            dragElastic={2}
            className='text-2xl hover:-translate-y-1 transition duration-100'><CiLinkedin /></motion.button>
          <motion.button
            drag
            dragConstraints={{ top: 0, left: 0, bottom: 0, right: 0 }}
            dragElastic={2}
            className='text-2xl hover:-translate-y-1 transition duration-100'><MdOutlineEmail /></motion.button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className='w-[100%]'><MobileNavbar /></motion.div>
    </div>
  )
}

export default HomePage; 