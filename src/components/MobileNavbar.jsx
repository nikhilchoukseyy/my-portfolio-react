import React from 'react'
import { motion } from "framer-motion";
import { Link, useLoaderData } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

let tabs = [
  { id: 'home', label: 'Home', link:'/' },
  { id: 'projects', label: 'Projects', link:'/projects' },
  { id: 'skills', label: 'Skills', link:'/skills' },
  { id: 'education', label: 'Education',link:'/education' },
  { id: 'contact', label: 'Contact',link:'/contact' },
]


const MobileNavbar = () => {
  const location = useLocation() ; 
  
  const currentTab = tabs.find(tab => tab.link === location.pathname); 

  const activeTab = currentTab ? currentTab.id : tabs[0].id; 

  const handleTabClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-max-auto h-[8dvh] md:hidden flex justify-center items-center text-center px-2 py-2 fixed bottom-12 bg-gray-900 rounded-full">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.link}
          onClick={() => handleTabClick(tab.id)}
          className={`
    relative px-1 py-1 text-xs font-medium transition-all duration-300
    ${activeTab === tab.id ? "text-black" : "text-white opacity-40 hover:opacity-100"}
  `}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-0 bg-white rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </Link>

      ))}
    </div>
  )
}

export default MobileNavbar