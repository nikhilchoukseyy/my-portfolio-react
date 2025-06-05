import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Link, useLoaderData } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { GoProjectRoadmap } from "react-icons/go"
import { FaTools } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";
import useScrollDirection from '../hooks/useScrollDirection'

let tabs = [
  { id: 'home', label: 'Home', link: '/', icon: <IoMdHome /> },
  { id: 'projects', label: 'Projects', link: '/projects', icon: <GoProjectRoadmap /> },
  { id: 'skills', label: 'Skills', link: '/skills', icon: <FaTools /> },
  { id: 'education', label: 'Education', link: '/education', icon: <FaUniversity /> },
  { id: 'contact', label: 'Contact', link: '/contact', icon: <MdContactEmergency /> },
]


const DesktopNavbar = () => {

  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');
  const scrollUp = useScrollDirection(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    tabs.forEach((tab) => {
      const section = document.getElementById(tab.id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])



  const handleTabClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: scrollUp ? 0 : -100 }}
      transition={{ type: 'tween' }}
      className='fixed top-0 w-full justify-center px-8 pt-1 mt-0 flex flex-row items-center text-center md:justify-between  rounded-full bg-gray-900 rounded-tl-none rounded-tr-none'>
      <span className='text-2xl '>nikhil<span className='text-blue-500'>chouksey</span></span>
      <div className="hidden sm:flex  justify-center items-center p-2 space-x-3">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`relative px-2 rounded-full py-1 text-xs font-medium transition-all duration-300 ${activeTab === tab.id
                ? 'text-black opacity-100 bg-white'
                : 'text-white opacity-40 hover:opacity-100'
              }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute bg-white rounded-full "
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <motion.span className="relative text-sm flex flex-row items-center justify-center">
              {tab.icon}{tab.id}
            </motion.span>
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}

export default DesktopNavbar