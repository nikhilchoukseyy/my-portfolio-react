import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { PROJECTS } from '../config/projects.config'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const ProjectCard = () => {
  useEffect(() => {
    const cards = gsap.utils.toArray('.projectcard')
    cards.forEach(card => {
      gsap.to(card, {
        scale: 0.88,
        opacity: 0.4,
        filter: 'blur(1px)',
        scrollTrigger: {
          trigger: card,
          start: 'top 12dvh',
          end: 'bottom 12dvh',
          scrub: true,
        },
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <main className="bg-bg-primary border-bg-tertiary border-dotted border-2 border-t-0 text-text-primary flex flex-col items-center min-h-screen px-4 sm:px-6 py-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2
          className="text-4xl sm:text-5xl font-semibold tracking-tight"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Things I've built
        </h2>
        <div className="w-8 h-px bg-text-primary/20 mx-auto mt-4" />
      </motion.div>

      {/* Stacked cards */}
      <div className="flex flex-col gap-5 w-full max-w-2xl lg:max-w-5xl pb-[55dvh]">
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className={`projectcard rounded-2xl bg-bg-secondary border border-text-primary/6 overflow-hidden shadow-xl lg:min-h-[360px]
              ${i === PROJECTS.length - 1 ? 'relative' : 'sticky top-[12dvh]'}`}
          >
            {/* Index label */}
            <div className="absolute top-4 right-4 z-10">
              <span className="text-[10px] font-mono text-text-tertiary/40 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="w-full md:w-[48%] h-44 sm:h-52 md:h-64 lg:h-[360px] bg-bg-primary/50 flex items-center justify-center p-4 lg:p-6 flex-shrink-0">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center gap-3 p-5 sm:p-6 md:p-7 lg:gap-5 lg:p-10">
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'Google Sans Code', monospace" }}>
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm lg:text-base text-text-tertiary/70 leading-relaxed">
                  {p.desc}
                </p>

                {/* Tags if available */}
                {p.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-bg-primary border border-text-primary/10 text-text-tertiary/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-2 mt-1">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono bg-text-primary text-bg-primary px-4 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md"
                  >
                    <FiExternalLink size={12} />
                    Live
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono border border-text-primary/20 text-text-primary px-4 py-2 rounded-lg hover:bg-bg-primary active:scale-95 transition-all"
                  >
                    <FiGithub size={12} />
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

export default ProjectCard
