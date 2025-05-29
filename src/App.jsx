import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import ProjectPage from './components/ProjectPage'
import ContactMe from './components/ContactMe'
import EducationPage from './components/EducationPage'
import SkillsPage from './components/SkillsPage'

function App() {
  return (
    <div>
      <section id='home'><HomePage/></section>
      <section id='projects'><ProjectPage/></section>
      <section id='skills'><SkillsPage/></section>
      <section id='education'><EducationPage/></section>
      <section id='contact'><ContactMe/></section>
    </div>
  )
}

export default App
