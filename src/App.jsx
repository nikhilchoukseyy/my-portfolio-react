import './App.css'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import ContactMe from './pages/ContactMe'
import EducationPage from './pages/EducationPage'
import SkillsPage from './pages/SkillsPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import AdminPage from './pages/AdminPage'
import HackathonsPage from './pages/HackathonsPage'



function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<div>
      <section id='home' className='min-h-screen'><HomePage /></section>
      <section id='projects' className='min-h-screen'><ProjectPage /></section>
      <section id='hackathons' className='min-h-screen'><HackathonsPage /></section>
      <section id='skills' className='min-h-screen'><SkillsPage /></section>
      <section id='education' className='min-h-screen'><EducationPage /></section>
      <section id='contact' className='min-h-screen'><ContactMe /></section>
      </div>} />
    </Routes>
  )
}

export default App
