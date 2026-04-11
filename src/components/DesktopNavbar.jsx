import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { GoProjectRoadmap } from "react-icons/go"
import { FaTools } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";
import useScrollDirection from '../hooks/useScrollDirection'
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const tabs = [
  { id: 'home',      label: 'Home',      link: '/',          icon: <IoMdHome /> },
  { id: 'projects',  label: 'Projects',  link: '/projects',  icon: <GoProjectRoadmap /> },
  { id: 'skills',    label: 'Skills',    link: '/skills',    icon: <FaTools /> },
  { id: 'education', label: 'Education', link: '/education', icon: <FaUniversity /> },
  { id: 'contact',   label: 'Contact',   link: '/contact',   icon: <MdContactEmergency /> },
]

const DesktopNavbar = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const scrollUp = useScrollDirection()
  const { isDark, setIsDark } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveTab(e.target.id) }),
      { threshold: 0.3 }
    )
    tabs.forEach(tab => {
      const el = document.getElementById(tab.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleTabClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: scrollUp ? 0 : -80, opacity: scrollUp ? 1 : 0 }}
      transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/80 backdrop-blur-md border-b border-text-primary/8 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 h-14 sm:h-16">

        {/* Logo */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-2xl font-black tracking-tight font-cursive text-text-primary select-none"
        >
          nikhilchouksey<span className="opacity-25">.</span>
        </motion.span>

        {/* Nav links — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1">
          {tabs.map((tab, i) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
            >
              <Link
                to={tab.link}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-text-primary'
                    : 'text-text-primary/40 hover:text-text-primary/80'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 bg-bg-secondary rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 text-base">{tab.icon}</span>
                <span className="relative z-10 hidden md:inline">{tab.label}</span>
              </Link>
            </motion.div>
          ))}

          {/* Theme toggle */}
          <div className="ml-2 pl-2 border-l border-text-primary/10">
            <AnimatePresence mode="wait">
              <motion.button
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg text-text-primary/50 hover:text-text-primary hover:bg-bg-secondary transition-all"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: only theme toggle visible (nav handled by MobileNavbar) */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait">
            <motion.button
              key={isDark ? 'sun-m' : 'moon-m'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-text-primary/60 hover:text-text-primary transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
}

export default DesktopNavbar