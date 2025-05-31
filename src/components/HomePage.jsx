import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import avatarPhoto from '../assets/github-profile-photo.jpeg'

let tabs = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]


const HomePage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='bg-gray-950 h-[100vh] flex flex-col items-center text-white'>
      <nav className='h-[10vh] w-[100%] justify-center px-8 py-8 mb-12 flex flex-row items-center text-center md:justify-between'>
        <span className='text-2xl'>nikhil<span className='text-blue-500'>chouksey</span></span>
        <div className="hidden sm:block flex justify-center items-center p-4 space-x-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`${activeTab === tab.id ? "text-blue-500" : "text-white/70"
                } relative px-4 py-1 text-sm font-medium transition hover:text-white`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      <div className='flex flex-col items-center justify-center text-center h-auto gap-12'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          className="w-32 h-32 md:h-64 md:w-64 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg"
        >
          <img
            src={avatarPhoto}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full border-4 border-white"
          />
        </motion.div>
        <h1 className='gap-2 text-4xl flex flex-col text-center items-center justify-center md:flex-row'>
          Hello I am
          <span className='text-4xl text-blue-500'>
            <Typewriter
              words={[' Nikhil!', ' a web developer', ' a problem solver']}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={3000}
            />
          </span>
        </h1>
        <button className='bg-white rounded-full px-4 py-2 text-black font-bold border-4 transition shadow transform duration-300 hover:scale-110 hover:shadow-blue-500'>Download Resume</button>
      </div>
      <div className="w-auto h-[8dvh] md:hidden flex justify-center items-center text-center px-2 py-2 fixed bottom-0 bg-gray-900 rounded-full mb-10  gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
    relative px-1 py-1 text-sm font-medium transition-all duration-300
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
          </button>

        ))}
      </div>
    </div>
  )
}

export default HomePage; 