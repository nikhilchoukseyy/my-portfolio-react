import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PROJECTS } from '../config/projects.config'


gsap.registerPlugin(ScrollTrigger)

const ProjectCard = () => {
  useEffect(() => {
    gsap.utils.toArray('.projectcard').forEach(card => {
      gsap.to(card, {
        scale: 0.7,
        opacity: 0,
        scrollTrigger: {
          trigger: card,
          start: "top 15dvh",
          end: "bottom 15dvh ",
          scrub: true,
        }
      })
    })
  })

  return (
    <main className="bg-bg-primary border-bg-tertiary border-dotted border-2 text-text-primary flex min-w-full min-h-screen mx-auto p-6 flex-col items-center justify-center border-t-0">
      <h1 className="text-2xl font-thin mb-6 text-center ">Projects</h1>

      <div className="flex flex-col gap-8 min-w-full md:min-w-[80%] min-h-screen items-center justify-center mb-4 pb-[50dvh]  ">
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className={`projectcard flex flex-col shadow-2xl rounded-2xl bg-bg-buttons text-text-primary p-4 w-full size-96 text-wrap
      ${i === PROJECTS.length - 1 ? "relative" : "sticky top-[15dvh]"}`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center gap-2  md:px-12 md:py-12 ">
              <div className="w-full md:w-[90dvh] h-[20dvh] md:h-[40dvh] flex items-center justify-center"
                >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
              <div className='flex flex-col text-wrap md:w-[40dvh] text-center'>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm mx-2 my-2 text-text-tertiary opacity-70">{p.desc}</p>
                <div className="flex justify-center gap-2">
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    className="font-mono active:scale-95 transition cursor-pointer text-sm rounded-lg bg-bg-buttons2 text-text-primary px-8 py-1 shadow-xl">
                    Live
                  </a>
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="font-mono active:scale-95 transition cursor-pointer text-sm rounded-lg bg-bg-buttons2 text-text-primary px-8 py-1 shadow-xl">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </main>
  )
}


export default ProjectCard; 