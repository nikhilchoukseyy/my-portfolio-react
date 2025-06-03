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

const fadeInUpAnimation = {
  hidden: {
    opacity: 0,
    y: 50
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 1
    },
  },
}

const HomePage = () => {

  return (
    <div className='bg-gray-950 h-[100vh] flex flex-col items-center text-white font-mono'>
      <DesktopNavbar />
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


        <motion.button
          drag
          dragElastic={2}
          className="flex flex-row bg-white bg-opacity-100 rounded-full px-4 py-2 text-black font-extrabold  transition transform hover:bg-white hover:shadow-sm hover:shadow-blue-500 hover:bg-opacity-100 cursor-pointer  md:mt-4 md:mb-4 hover:scale-105 md:hover:scale-100">
          <a className="flex flex-row gap-2 ">
            <span>Download Resume</span>
            <Download className='hover:translate-y-1 transition duration-300' />
          </a>
        </motion.button>
        <motion.div
          variants={fadeInUpAnimation}
          initial="hidden"
          animate="show"
          className=' flex flex-row gap-4  '>
          <motion.button drag className='text-2xl hover:-translate-y-1 transition duration-100'><FaGithub /></motion.button>
          <motion.button drag className='text-2xl hover:-translate-y-1 transition duration-100'><CiLinkedin /></motion.button>
          <motion.button drag className='text-2xl hover:-translate-y-1 transition duration-100'><MdOutlineEmail /></motion.button>
        </motion.div>
      </div>
      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1,duration:1}}
        className='w-[100%]'><MobileNavbar /></motion.div>
    </div>
  )
}

export default HomePage; 