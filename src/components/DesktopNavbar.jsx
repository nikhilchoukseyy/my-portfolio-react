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
import FadeInUpAnimation from '../hooks/FadeInUpAnimation';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
// import useClickSound from '../hooks/useClickSound';
// import clickSound from '../assets/clickSound.mp3'

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

  const { isDark, setIsDark } = useTheme();

  // const playClick = useClickSound(clickSound);

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
      initial={{ y: -100 }}
      animate={{ y: scrollUp ? 0 : -100 }}
      transition={{ type: 'tween', duration: 0.5 }}
      className='bg-bg-primary fixed top-0 w-full md:pt-4 px-4 md:px-12 mt-0 flex flex-row justify-between h-[10dvh] items-center font-sans z-10'>
      <span className='text-2xl md:text-4xl pb-2 font-extrabold font-cursive'>nikhil<span className=' text-text-primary '>chouksey</span></span>
      <motion.button
              key={isDark ? 'moon' : 'sun'}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              onClick={() => {
                setIsDark(!isDark);  
              }}
              className='visible md:invisible '
            >
              {isDark ? <Sun size={28} /> : <Moon size={28} />}
            </motion.button>
      <div className="hidden sm:flex  justify-center items-center p-2 space-x-3 ">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            onClick={() => {handleTabClick(tab.id); /*playClick()*/}}
            className={`relative shadow-xl px-2 rounded-lg py-1 text-lg font-medium transition-all duration-300 ${activeTab === tab.id
              ? 'text-text-primary opacity-100 bg-bg-secondary scale-110'
              : 'text-text-primary opacity-40 hover:opacity-100'
              }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute bg-white rounded-full "
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <motion.span className="relative text-lg flex flex-row items-center justify-center">
              {tab.icon}{tab.id}
            </motion.span>
          </Link>
        ))}
        <motion.button
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            setIsDark(!isDark);
            /*playClick();*/
          } }
          
          className='hover:bg-bg-secondary p-1 rounded-full'
        >
          {isDark ? <Sun size={28} /> : <Moon size={28} />}
        </motion.button>
      </div>

    </motion.nav>
  )
}

export default DesktopNavbar