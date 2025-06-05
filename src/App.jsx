import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import ContactMe from './pages/ContactMe'
import EducationPage from './pages/EducationPage'
import SkillsPage from './pages/SkillsPage'
// import { Routes, Route } from 'react-router-dom'
import { div } from 'framer-motion/client'

function App() {
  return (
    <div>
      <section id='home' className='min-h-screen'><HomePage /></section>
      <section id='projects' className='min-h-screen'><ProjectPage /></section>
      <section id='skills' className='min-h-screen'><SkillsPage /></section>
      <section id='education' className='min-h-screen'><EducationPage /></section>
      <section id='contact' className='min-h-screen'><ContactMe /></section>
    </div>

    // <Routes>
    //   <Route path='/' element={<HomePage/>}/>
    //   <Route path='/projects' element={<ProjectPage/>}/>
    //   <Route path='/skills' element={<SkillsPage/>}/>
    //   <Route path='/education' element={<EducationPage/>}/>
    //   <Route path='/contact' element={<ContactMe/>}/>
    // </Routes>
  )
}

export default App
