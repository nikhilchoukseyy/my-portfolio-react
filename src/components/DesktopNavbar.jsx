import React from 'react'
import { motion } from "framer-motion";
import { Link, useLoaderData } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

let tabs = [
  { id: 'home', label: 'Home', link: '/' },
  { id: 'projects', label: 'Projects', link: '/projects' },
  { id: 'skills', label: 'Skills', link: '/skills' },
  { id: 'education', label: 'Education', link: '/education' },
  { id: 'contact', label: 'Contact', link: '/contact' },
]


const DesktopNavbar = () => {
  
  const location = useLocation() ; 
  
  const currentTab = tabs.find(tab => tab.link === location.pathname); 

  const activeTab = currentTab ? currentTab.id : tabs[0].id; 

  const handleTabClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className='h-[10dvh] w-[100%] justify-center px-8 py-8 mb-8 flex flex-row items-center text-center md:justify-between'>
      <span className='text-2xl '>nikhil<span className='text-blue-500'>chouksey</span></span>
      <div className="hidden sm:block  justify-center items-center p-4 space-x-3">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={`${tab.link}`}
            onClick={() => handleTabClick(tab.id)}
            className={`${activeTab === tab.id ? "text-blue-500" : "text-white/70"
              } relative px-4 py-1 text-sm font-medium transition text-white/70 text-blue-500 hover:text-white`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default DesktopNavbar