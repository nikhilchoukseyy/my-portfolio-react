import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import avatarPhoto from '../assets/github-profile-photo.jpeg'
import { FaFilePdf } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import MobileNavbar from '../components/MobileNavbar';
import DesktopNavbar from '../components/DesktopNavbar';
import FadeInUpAnimation from '../hooks/FadeInUpAnimation';
import useClickSound from '../hooks/useClickSound';
import clickSound from '../assets/clickSound.mp3'

const introPoints = [
  "i am skilled in Web Development",
  "have Strong DSA problem-solving",
  "Building real-world software projects",
];

const HomePage = () => {

  const playClick = useClickSound(clickSound);

  return (
    <div className='bg-bg-primary min-h-screen w-full overflow-x-hidden flex flex-col items-center text-text-primary font-sans gap-4 border-bg-tertiary border-dotted border-2'>
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
        <div className="h-auto w-[80%] flex flex-col md:flex-col md:items-center items-center justify-center gap-2 mt-2 mb-0 md:mb-6 text-center px-0">
     
      <h1 className="text-3xl md:text-4xl font-extrabold opacity-90">
        Hello{" "}
        <motion.span
          style={{ display: "inline-block", transformOrigin: "70% 70%" }}
          animate={{ rotate: [0, 20, -10, 20, -6, 15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          👋
        </motion.span>{" "}
        I am Nikhil Chouksey
      </h1>

      
      <motion.ul
        className="mt-4 md:text-xl text-md text-text-tertiary font-medium list-disc text-center md:w-full px-0 ml-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 0.7,
            transition: { staggerChildren: 0.4 },
          },
        }}
      >
        {introPoints.map((point, index) => (
          <motion.li
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {point}
          </motion.li>
        ))}
      </motion.ul>
    </div>


        <motion.button
          className="bg-bg-buttons rounded-lg px-4 py-2 text-text-primary transition active:shadow-xs  active:bg-opacity-100 cursor-pointer  md:mt-8 md:mb-2 active:scale-95 md:active:scale-95 border-0 font-sans md:text-xl mt-0 shadow-xl">
          <a className="flex flex-row gap-2 font-mono" href='https://drive.google.com/file/d/1-uWGY7Ve4NkuRr85NnimyfoUgKF3TeG2/view?usp=sharing'>
            <span>View Resume</span>
            <FaFilePdf />
          </a>
        </motion.button>
        
      </div>
      <motion.div
        className='w-[100%]'><MobileNavbar /></motion.div>
    </div>
  )
}

export default HomePage; 