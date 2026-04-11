import React from 'react'
import { FaReact, FaHtml5, FaNode, FaJava, FaGithub, FaPython } from 'react-icons/fa'
import { IoLogoCss3, IoLogoJavascript } from 'react-icons/io5'
import { BiLogoJavascript } from 'react-icons/bi'
import { SiExpress, SiMongodb, SiPostman, SiRender, SiTailwindcss ,SiFramer,SiGreensock ,SiSocketdotio,SiSupabase,SiRailway} from 'react-icons/si'
import { AiOutlineApi } from 'react-icons/ai'
import { RiVercelLine } from 'react-icons/ri'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    accent: 'text-blue-400',
    skills: [
      { icon: FaReact, label: 'React', color: 'text-blue-400' },
      { icon: FaHtml5, label: 'HTML5', color: 'text-orange-400' },
      { icon: IoLogoCss3, label: 'CSS3', color: 'text-blue-500' },
      { icon: BiLogoJavascript, label: 'JavaScript', color: 'text-yellow-300' },
      { icon: SiTailwindcss, label: 'Tailwind', color: 'text-cyan-400' },
      { icon: SiFramer, label: 'Motion', color: 'text-pink-400' },
      { icon: SiGreensock, label: 'GSAP', color: 'text-green-400' },

    ],
  },
  {
    title: 'Backend',
    accent: 'text-green-400',
    skills: [
      { icon: FaNode, label: 'Node.js', color: 'text-green-500' },
      { icon: SiExpress, label: 'Express', color: 'text-text-primary' },
      { icon: SiMongodb, label: 'MongoDB', color: 'text-green-400' },
      { icon: AiOutlineApi, label: 'REST API', color: 'text-purple-400' },
      { icon: SiSocketdotio, label: 'Socket.io', color: 'text-text-primary' },
{ icon: SiSupabase,    label: 'Supabase',  color: 'text-emerald-400' },
    ],
  },
  {
    title: 'Languages',
    accent: 'text-yellow-300',
    skills: [
      { icon: FaPython, label: 'Python', color: 'text-yellow-300' },
      { icon: FaJava, label: 'Java', color: 'text-red-400' },
      { icon: IoLogoJavascript, label: 'JavaScript', color: 'text-yellow-300' },
    ],
  },
  {
    title: 'Tools',
    accent: 'text-text-tertiary',
    skills: [
      { icon: FaGithub, label: 'GitHub', color: 'text-text-primary' },
      { icon: SiPostman, label: 'Postman', color: 'text-orange-500' },
      { icon: RiVercelLine, label: 'Vercel', color: 'text-text-primary' },
      { icon: SiRender, label: 'Render', color: 'text-teal-400' },
      { icon: SiRailway, label: 'Railway', color: 'text-purple-400' },
    ],
  },
]

const SkillChip = ({ icon: Icon, label, color }) => (
  <motion.div
    whileHover={{ scale: 1.08, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-1.5 cursor-default group"
  >
    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-bg-primary border border-text-primary/8 flex items-center justify-center shadow-md group-hover:border-text-primary/20 transition-colors duration-200">
      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
    </div>
    <span className="text-[9px] sm:text-[10px] font-mono text-text-tertiary tracking-wide text-center leading-tight">
      {label}
    </span>
  </motion.div>
)

const SkillsPage = () => {
  return (
    <section className="bg-bg-primary min-h-screen flex flex-col items-center justify-center text-text-primary border-bg-tertiary border-dotted border-2 border-t-0 py-16 px-5 overflow-hidden">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-tertiary/60 block mb-2">
          What I work with
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: "'Google Sans Code', monospace" }}>
          Skills
        </h2>
        <div className="w-8 h-px bg-text-primary/20 mx-auto mt-4" />
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-2xl"
      >
        {SKILL_GROUPS.map((group) => (
          <motion.div
            key={group.title}
            variants={cardVariants}
            className="rounded-2xl bg-bg-secondary border border-text-primary/6 p-5 sm:p-6 hover:border-text-primary/15 transition-colors duration-300 shadow-sm"
          >
            {/* Card title */}
            <div className="flex items-center gap-2 mb-5">
              <div className={`w-1.5 h-4 rounded-full ${group.accent} opacity-70`} style={{ background: 'currentColor' }} />
              <h3 className="text-xs sm:text-sm font-mono tracking-widest uppercase text-text-tertiary/70">
                {group.title}
              </h3>
            </div>

            {/* Skills row */}
            <div className="flex flex-wrap gap-4 sm:gap-5">
              {group.skills.map((skill) => (
                <SkillChip key={skill.label} {...skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default SkillsPage