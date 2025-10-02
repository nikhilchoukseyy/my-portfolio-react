import React from 'react'
import DesktopNavbar from '../components/DesktopNavbar'
import MobileNavbar from '../components/MobileNavbar'
import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { BiLogoJavascript } from "react-icons/bi";
import { FaNode } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { AiOutlinePython } from "react-icons/ai";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import { RiVercelLine } from "react-icons/ri";
import { SiRender } from "react-icons/si";
import { easeInOut, motion } from "framer-motion";


const containerVariants = {
  hidden: {
    opacity: 1
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    }
  }
}

const childrenVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
}

const SkillsPage = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className='bg-bg-primary min-h-screen flex flex-col items-center justify-center text-text-primary border-bg-tertiary border-dotted border-2 border-t-0 py-2 overflow-hidden'>
      <h1 className='font-thin text-2xl py-6 '>Skils</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 md:gap-12 [&>*]:px-2 [&>*]:py-2 [&>*]:border-2 [&>*]:md:size-72 [&>*]:size-48 [&>*]:w-64 [&>*]:bg-bg-buttons [&>*]:border-bg-buttons [&>*]:shadow-lg [&>*]:rounded-2xl '>
        <motion.div
          variants={childrenVariants}
          className='text-center h-1/4 hover:scale-105 transition-transform ease-in-out  duration-[1s]'>
          <h1 className='opacity-70 pb-2 pt-0 text-lg text-text-secondary'>Frontend</h1>
          <div className='grid grid-cols-3 gap-2'>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition w-[1/3] text-blue-500 '>
              <FaReact className='size-8 md:size-12' />
              <span className=''>React</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-green-600'>
              <FaHtml5 className='size-8 md:size-12' />
              <span className=''>HTML5</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-blue-700 '>
              <IoLogoCss3 className='size-8 md:size-12' />
              <span className=''>CSS3</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-yellow-300'>
              <BiLogoJavascript className='size-8 md:size-12' />
              <span className=''>JS</span>
            </div>
          </div>

        </motion.div>
        <motion.div
          variants={childrenVariants}
          className='text-center h-1/4 hover:scale-105 transition-transform ease-in-out  duration-[1s]'>
          <h1 className='opacity-70 pb-2 pt-0 text-lg text-text-secondary'>Backend</h1>
          <div className='grid grid-cols-3 gap-2'>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition w-[1/3]  text-green-800'>
              <FaNode className='size-8 md:size-12' />
              <span className=''>Node.js</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-yellow-300'>
              <SiExpress className='size-8 md:size-12' />
              <span className=''>Express.js</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-green-500'>
              <SiMongodb className='size-8 md:size-12' />
              <span className=''>MongoDB</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-red-500'>
              <AiOutlinePython className='size-8 md:size-12' />
              <span className=''>RestAPI</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={childrenVariants}
          className='text-center h-1/4 hover:scale-105 transition-transform ease-in-out  duration-[1s]'>
          <h1 className='opacity-70 pb-2 pt-0 text-lg text-text-secondary'>Languages</h1>
          <div className='grid grid-cols-3 gap-2'>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition w-[1/3] text-yellow-200'>
              <FaPython className='size-8 md:size-12' />
              <span className=''>Python</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-slate-400'>
              <FaJava className='size-8 md:size-12' />
              <span className=''>Java</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-yellow-300'>
              <IoLogoJavascript className='size-8 md:size-12' />
              <span className=''>JS</span>
            </div>
          </div>

        </motion.div>
        <motion.div
          variants={childrenVariants}
          className='text-center h-1/4 hover:scale-105 transition-transform ease-in-out  duration-[1s]'>
          <h1 className='opacity-70 pb-2 pt-0 text-lg text-text-secondary'>Tools & Technology</h1>
          <div className='grid grid-cols-3 gap-2'>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition w-[1/3]'>
              <FaGithub className='size-8 md:size-12' />
              <span className='text-xs'>Git & Github</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-orange-500'>
              <SiPostman className='size-8 md:size-12' />
              <span className=''>Postman</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition text-teal-500'>
              <RiVercelLine className='size-8 md:size-12' />
              <span className=''>Vercel</span>
            </div>
            <div className='border-1 px-2 py-1 bg-bg-buttons2 w-[1/3] rounded-lg items-center justify-center flex flex-col   cursor-pointer active:scale-90 transition '>
              <SiRender className='size-8 md:size-12' />
              <span className=''>Render</span>
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>

  )
}

export default SkillsPage