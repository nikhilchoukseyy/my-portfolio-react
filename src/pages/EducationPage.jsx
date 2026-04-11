import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Education = [
  {
    id: '10th',
    year: '2020',
    title: '10th Grade',
    institute: 'Vivekanand Higher Secondary School',
    result: '94.6%',
    tag: 'MPBSE',
  },
  {
    id: '12th',
    year: '2022',
    title: '12th Grade',
    institute: 'Vivekanand Higher Secondary School',
    result: '90.6%',
    tag: 'PCM · MPBSE',
  },
  {
    id: 'uni',
    year: '2023 – 2027',
    title: 'B.Tech in Information Technology',
    institute: 'University Institute of Technology, RGPV Bhopal',
    result: 'CGPA 7.4',
    tag: 'Current · 5th Sem',
  },
]

const cardVariants = {
  hidden: { opacity: 0, x: -24 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

const EducationPage = () => {
  return (
    <section className="bg-bg-primary min-h-screen flex flex-col items-center justify-center text-text-primary border-bg-tertiary border-dotted border-2 border-t-0 py-16 px-5 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-tertiary/60 block mb-2">
          Academic background
        </span>
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight"
          style={{ fontFamily: "'Google Sans Code', monospace" }}
        >
          Education
        </h2>
        <div className="w-8 h-px bg-text-primary/20 mx-auto mt-4" />
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-xl flex flex-col gap-0">

        {/* Vertical line */}
        <div className="absolute left-[18px] sm:left-[22px] top-2 bottom-2 w-px bg-text-primary/10" />

        {Education.map((edu, i) => (
          <motion.div
            key={edu.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="relative flex gap-5 sm:gap-7 pb-10 last:pb-0"
          >
            {/* Dot */}
            <div className="relative z-10 flex-shrink-0 mt-1">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-bg-secondary border border-text-primary/15 flex items-center justify-center shadow-sm">
                <span className="text-[10px] sm:text-[11px] font-black font-mono text-text-primary/60 tabular-nums leading-none text-center px-0.5">
                  {edu.year.split('–')[0].trim().slice(-2)}
                </span>
              </div>
            </div>

            {/* Card */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="flex-1 bg-bg-secondary border border-text-primary/6 rounded-2xl p-4 sm:p-5 hover:border-text-primary/15 transition-colors duration-300 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                <h3 className="text-sm sm:text-base font-bold tracking-tight leading-snug" style={{ fontFamily: "'Google Sans Code', monospace" }}>
                  {edu.title}
                </h3>
                <span className="text-xs font-mono text-text-tertiary/50 whitespace-nowrap">{edu.year}</span>
              </div>

              <p className="text-xs sm:text-sm text-text-tertiary/60 mb-3 leading-snug">{edu.institute}</p>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Result badge */}
                <span className="inline-block bg-bg-primary border border-text-primary/10 text-text-primary font-mono font-bold text-xs px-3 py-1 rounded-lg">
                  {edu.result}
                </span>
                {/* Tag */}
                <span className="text-[10px] font-mono text-text-tertiary/40 tracking-wide">
                  {edu.tag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default EducationPage