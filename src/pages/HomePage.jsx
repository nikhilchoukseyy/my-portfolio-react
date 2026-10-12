import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import avatarPhoto from '../assets/nikhilcodinghoodie.png'
import { FaFilePdf, FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { MdOutlineEmail } from 'react-icons/md'
import MobileNavbar from '../components/MobileNavbar'
import DesktopNavbar from '../components/DesktopNavbar'
import useClickSound from '../hooks/useClickSound'
import clickSound from '../assets/clickSound.mp3'
import { SOCIAL_LINKS } from '../config/socials.config'

/* ── animation variants ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const slideUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
/* ── data ── */
const STATS = [
  { value: '300+', label: 'LeetCode' },
  { value: 'Top 5', label: 'SIH 2025' },
  { value: '12+',   label: 'Shipped' },
]

const STACK = ['React', 'Node.js', 'Express', 'MongoDB', 'Python']

/* ── stat chip ── */
const Stat = ({ value, label }) => (
  <div className="flex flex-col items-center gap-0.5 px-3 sm:px-4">
    <span className="text-base sm:text-lg font-black text-text-primary font-mono tabular-nums">{value}</span>
    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-text-tertiary/60 whitespace-nowrap">{label}</span>
  </div>
)

/* ── skill pill ── */
const Pill = ({ children }) => (
  <span className="text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-lg bg-bg-primary border border-text-primary/10 text-text-tertiary/70 whitespace-nowrap">
    {children}
  </span>
)

/* ── inline highlight ── */
const Hl = ({ children }) => (
  <span className="text-text-primary font-semibold">{children}</span>
)

const HomePage = () => {
  const playClick = useClickSound(clickSound)
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    const move = (e) => {
      el.style.left = `${e.clientX}px`
      el.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div className="relative bg-bg-primary min-h-screen w-full overflow-x-hidden flex flex-col text-text-primary font-sans border-bg-tertiary border-dotted border-2">

      {/* ── cursor glow (desktop) ── */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 hidden lg:block w-[600px] h-[600px] rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 60%)',
          transition: 'left 0.12s ease, top 0.12s ease',
        }}
      />

      <DesktopNavbar />

      {/* ══════════ HERO ══════════ */}
      <motion.main
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-16 pb-28 sm:pb-12 px-5 sm:px-8"
      >

        {/* ── CARD ── */}
        <motion.div
          variants={slideUp}
          className="w-full max-w-lg sm:max-w-2xl lg:max-w-3xl"
        >
          <div className="relative rounded-3xl border border-text-primary/15 bg-gradient-to-br from-bg-secondary/70 via-bg-primary to-bg-secondary/30 backdrop-blur-sm shadow-[0_24px_100px_rgba(255,255,255,0.06)] overflow-hidden">

            {/* card top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-primary/20 to-transparent" />

            {/* ── CARD INNER ── */}
            <div className="p-6 sm:p-9 lg:p-11 flex flex-col gap-5 sm:gap-7 lg:gap-8">

              

              {/* ── Row 1: Avatar + Name ── */}
              <div className="flex items-center gap-4 sm:gap-5">

                {/* Avatar */}
                <div className="relative flex-shrink-0 w-[88px] h-[88px] sm:w-[112px] sm:h-[112px] lg:w-[128px] lg:h-[128px]">
                  {/* spinning ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[-2px] rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 50%, rgba(255,255,255,0.55) 75%, transparent 100%)',
                      borderRadius: '9999px',
                    }}
                  />
                  <div className="absolute inset-[2px] rounded-full overflow-hidden bg-bg-primary">
                    <img
                      src={avatarPhoto}
                      alt="Nikhil Chouksey"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name + title */}
                <div className="flex flex-col gap-1 min-w-0">
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-normal leading-tight text-text-primary font-cursive"
                    >
                      Nikhil Chouksey
                    </motion.h1>
                  </div>
                <p className="text-xs sm:text-sm text-yellow-400 font-mono tracking-wide">
                    Full-Stack Developer
                  </p>
                </div>
              </div>

              {/* ── Divider ── */}
              <div className="h-px bg-text-primary/6" />

              {/* ── Row 2: Description ── */}
              <p className="text-sm sm:text-base text-text-tertiary/80 leading-relaxed max-w-2xl">
                <Hl>SIH 2025 National Finalist</Hl> (Top 5). Building production-ready apps with{' '}
                <Hl>MERN stack</Hl>, <Hl>Python</Hl> &amp; <Hl>AI integrations</Hl>.{' '}
                Solved <Hl>300+ LeetCode</Hl> problems.
              </p>

              {/* ── Row 3: Stats ── */}
              <div className="flex items-center justify-center divide-x divide-text-primary/8 py-1">
                {STATS.map((s) => (
                  <Stat key={s.label} value={s.value} label={s.label} />
                ))}
              </div>

              {/* ── Row 4: Tech stack pills ── */}
              <div className="flex flex-wrap items-center gap-2 justify-center">
                {STACK.map((tech) => (
                  <Pill key={tech}>{tech}</Pill>
                ))}
              </div>

              {/* ── Divider ── */}
              <div className="h-px bg-text-primary/6" />

              {/* ── Row 5: CTAs ── */}
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://drive.google.com/file/d/1i6MOAZYU6eQHdQQyyI1jBPFtaOuimwqX/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 bg-text-primary text-bg-primary font-mono font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg"
                  >
                    <FaFilePdf size={13} />
                    View Resume
                  </motion.button>
                </a>

                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playClick?.()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex-1 flex items-center justify-center gap-2 border border-text-primary/20 text-text-primary font-mono text-xs sm:text-sm py-3 rounded-xl hover:bg-bg-primary/60 transition-colors"
                >
                  Let's Talk →
                </motion.button>
              </div>

              {/* ── Row 6: Social links ── */}
              <div className="flex items-center justify-center gap-6 sm:gap-7 pt-1">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      whileHover={{ y: -3 }}
                      className="flex flex-col items-center gap-1 text-text-primary/40 hover:text-text-primary transition-colors duration-200"
                    >
                      <span className="text-lg sm:text-xl"><Icon /></span>
                      <span className="text-[9px] font-mono tracking-wide">{social.label}</span>
                    </motion.a>
                  )
                })}
              </div>

            </div>{/* end card inner */}

            {/* card bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
          </div>
        </motion.div>

      </motion.main>

      <MobileNavbar />
    </div>
  )
}

export default HomePage
