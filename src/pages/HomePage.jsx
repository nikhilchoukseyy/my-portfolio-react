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
import useClickSound from '../hooks/useClickSound';
import clickSound from '../assets/clickSound.mp3'

const HomePage = () => {

  const playClick = useClickSound(clickSound);

  return (
    <div className='bg-bg-primary min-h-screen w-full overflow-x-hidden flex flex-col items-center text-text-primary font-sans gap-4'>
      <DesktopNavbar />
      <div className='flex flex-col items-center justify-center text-center gap-8 mt-24 md:mt-32 md:gap-4'>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 2 }}
          className="w-32 md:h-56 md:w-56 rounded-full p-0.5 bg-text-primary shadow-lg"
        >
          <img
            src={avatarPhoto}
            alt="Avatar"
            className="w-full object-cover rounded-full border-4 border-bg-primary"
          />
        </motion.div>
        <div className='h-auto w-[80%] flex flex-col md:flex-col md:items-center items-center justify-center gap-2 mt-2 mb-0 md:mb-6 text-center px-0'>
          <h1 className='text-3xl md:text-4xl font-extrabold'>Hello I am Nikhil chouksey</h1>
          <span
            className='h-auto md:h-[48px] md:text-center text-md font-normal md:text-xl  md:w-[50%]  text-text-tertiary px-2 text-center'
          >Information Technology student skilled in web development, DSA, and building real-world software projects
            {/* <Typewriter
      words={['Information Technology student skilled in web development, DSA, and building real-world software projects']}
      // loop={false}
      // cursor
      // cursorStyle="_"
      // typeSpeed={100}
      // deleteSpeed={100}
      // delaySpeed={3000}
    /> */}
          </span>
        </div>


        <motion.button
          onClick={() => { playClick(); }}
          className="bg-bg-buttons rounded-lg px-4 py-2 text-text-secondary  transition active:shadow-xs  active:bg-opacity-100 cursor-pointer  md:mt-4 md:mb-4 active:scale-95 md:active:scale-95 md:hover:bg-bg-tertiary border-text-primary hover:shadow-text-primary hover:text-text-secondary border-0 font-sans md:text-xl mt-0">
          <a className="flex flex-row gap-2 ">
            <span>Download Resume</span>
            <Download className='hover:translate-y-1 transition duration-200' />
          </a>
        </motion.button>
        {/* <motion.div
          className=' flex flex-row gap-4  '>
          <motion.button
            onClick={() => { playClick(); }}
            className='text-2xl hover:-translate-y-1 transition duration-200'><FaGithub /></motion.button>
          <motion.button
            onClick={() => { playClick(); }}
            className='text-2xl hover:-translate-y-1 transition duration-200'><CiLinkedin /></motion.button>
          <motion.button
            onClick={() => { playClick(); }}
            className='text-2xl hover:-translate-y-1 transition duration-200'><MdOutlineEmail /></motion.button>
        </motion.div> */}
      </div>
      <motion.div
        className='w-[100%]'><MobileNavbar /></motion.div>
    </div>
  )
}

export default HomePage; 