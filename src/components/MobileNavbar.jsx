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


const MobileNavbar = () => {
  const location = useLocation();

  const currentTab = tabs.find(tab => tab.link === location.pathname);

  const activeTab = currentTab ? currentTab.id : tabs[0].id;

  const heightClass = {
    '/': "h-[8dvh] fixed bottom-12",
    '/projects': "h-[8dvh] fixed bottom-1.5",
    '/skills': "h-[8dvh] fixed bottom-1.5",
    '/education': "h-[8dvh] fixed bottom-1.5",
    '/contact': "h-[8dvh] fixed bottom-1.5",
  }[location.pathname] || 'h-[8dvh] fixed bottom-1.5';

  const handleTabClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`w-max-auto ${heightClass} md:hidden flex justify-center items-center text-center px-2 py-2  bg-gray-900 rounded-full gap-1 `}>
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
              className="absolute inset-0 z-2 bg-white rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <motion.span
            className="relative z-10 flex flex-col items-center justify-center">
            {tab.icon}
            {tab.id}
          </motion.span>
        </Link>

      ))}
    </div>
  )
}

export default MobileNavbar