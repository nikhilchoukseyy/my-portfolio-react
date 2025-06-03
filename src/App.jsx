import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import ContactMe from './pages/ContactMe'
import EducationPage from './pages/EducationPage'
import SkillsPage from './pages/SkillsPage'
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/projects' element={<ProjectPage/>}/>
      <Route path='/skills' element={<SkillsPage/>}/>
      <Route path='/education' element={<EducationPage/>}/>
      <Route path='/contact' element={<ContactMe/>}/>
    </Routes>
  )
}

export default App
