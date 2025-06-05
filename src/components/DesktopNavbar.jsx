import React from 'react'
import { motion } from "framer-motion";
import { Link, useLoaderData } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { GoProjectRoadmap } from "react-icons/go"
import { FaTools } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";

let tabs = [
  { id: 'home', label: 'Home', link: '/', icon: <IoMdHome /> },
  { id: 'projects', label: 'Projects', link: '/projects', icon: <GoProjectRoadmap /> },
  { id: 'skills', label: 'Skills', link: '/skills', icon: <FaTools /> },
  { id: 'education', label: 'Education', link: '/education', icon: <FaUniversity /> },
  { id: 'contact', label: 'Contact', link: '/contact', icon: <MdContactEmergency /> },
]


const DesktopNavbar = () => {
  
  const location = useLocation() ; 
  
  const currentTab = tabs.find(tab => tab.link === location.pathname); 

  const activeTab = currentTab ? currentTab.id : tabs[0].id; 

  const handleTabClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className='w-full justify-center px-4 py-2 md:mb-12 flex flex-row items-center text-center md:justify-between'>
      <span className='text-2xl '>nikhil<span className='text-blue-500'>chouksey</span></span>
      <div className="hidden sm:flex  justify-center items-center p-4 space-x-3">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={`${tab.link}`}
            onClick={() => handleTabClick(tab.id)}
            className={`${activeTab === tab.id ? "text-blue-500" : "text-white/70"
              } relative px-4 py-1 flex flex-row items-center justify-center  text-sm font-medium transition text-white/70 text-blue-500 hover:text-white`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-full "
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.icon}{tab.id}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default DesktopNavbar