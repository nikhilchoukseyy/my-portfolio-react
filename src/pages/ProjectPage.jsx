import React from 'react'
import { motion } from "framer-motion";
import DesktopNavbar from '../components/DesktopNavbar'
import MobileNavbar from '../components/MobileNavbar'
import { div } from 'framer-motion/client';


const ProjectPage = () => {
  const projects = [
    { title: "project1", desc: "description1", live: "#", github: "#", accent: ["", ""], emoji: "" },
    { title: "project2", desc: "description2", live: "#", github: "#", accent: ["", ""], emoji: "" },
    { title: "project3", desc: "description3", live: "#", github: "#", accent: ["", ""], emoji: "" }
  ]
  return (
    <main className="bg-bg-primary text-text-primary max-w-full min-h-screen mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="flex flex-col gap-6">
        {projects.map((p) => (
          <div key={p.title} className="rounded-2xl bg-gray-800 p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-20 h-16 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${p.accent[0]}, ${p.accent[1]})` }}>
                <span className="text-2xl">{p.emoji}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-300">{p.desc}</p>
                <div className="mt-2 flex gap-4">
                  <a href={p.live} className="underline text-sm">Live</a>
                  <a href={p.github} className="underline text-sm">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>

  )
}

export default ProjectPage