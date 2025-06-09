import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { GoProjectRoadmap } from 'react-icons/go'
import { FaTools, FaUniversity } from 'react-icons/fa'
import { MdContactEmergency } from 'react-icons/md'
import useScrollDirection from '../hooks/useScrollDirection'
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';


const tabs = [
  { id: 'home', label: 'Home', link: '/', icon: <IoMdHome /> },
  { id: 'projects', label: 'Projects', link: '/projects', icon: <GoProjectRoadmap /> },
  { id: 'skills', label: 'Skills', link: '/skills', icon: <FaTools /> },
  { id: 'education', label: 'Education', link: '/education', icon: <FaUniversity /> },
  { id: 'contact', label: 'Contact', link: '/contact', icon: <MdContactEmergency /> },
]

const MobileNavbar = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('home')
  const scrollUp = useScrollDirection();
  const { isDark, setIsDark } = useTheme();

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
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: scrollUp ? 0 : 100 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="w-full h-auto md:hidden flex justify-center items-center text-center px-4 py-2 bg-bg-secondary gap-6 fixed bottom-0 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`relative px-1 py-1 text-xs font-medium transition-all duration-300 ${activeTab === tab.id
              ? ' text-white bg-black rounded-full opacity-100'
              : ' text-text-primary  bg-transparent rounded-full opacity-50 hover:opacity-100'
            }`}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="tween"
              className="absolute inset-0 z-2 bg-[#111] rounded-full"
              transition={{ type: 'spring', bounce: 0.5, duration: 0.2 }}
            />
          )}
          <motion.span className="relative text-2xl z-10 flex flex-col items-center justify-center">
            {tab.icon}
          </motion.span>
        </button>
      ))}
      <motion.button
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsDark(!isDark)}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </motion.div>
  )
}

export default MobileNavbar
