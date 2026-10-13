import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiBriefcase, FiCalendar, FiX } from 'react-icons/fi'
import { getExperience } from '../lib/experience'

function monthYear(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
}

function Story({ entry, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = event => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape) }
  }, [onClose])

  const paragraphs = (entry.description || '').split(/\n\s*\n/).filter(Boolean)
  const photos = entry.photos || []
  return (
    <Motion.div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <Motion.article role="dialog" aria-modal="true" aria-labelledby="experience-story-title" className="relative max-h-[96dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-text-primary/10 bg-bg-primary text-text-primary shadow-2xl sm:rounded-3xl" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
        <button onClick={onClose} aria-label="Close experience details" className="sticky top-4 z-20 float-right mr-4 mt-4 rounded-full border border-white/15 bg-bg-primary/80 p-2 backdrop-blur"><FiX /></button>
        {photos[0] && <div className="h-56 sm:h-80"><img src={photos[0]} alt={`${entry.role} at ${entry.organization}`} className="h-full w-full object-cover" /></div>}
        <div className="mx-auto max-w-2xl px-6 py-8 sm:px-12 sm:py-12">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[.15em] text-text-tertiary"><FiCalendar /> {monthYear(entry.startDate)} — {entry.endDate ? monthYear(entry.endDate) : 'Present'}</p>
          <h2 id="experience-story-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">{entry.role}</h2>
          <p className="mt-3 text-lg text-text-primary/55">{entry.organization}</p>
          <div className="mt-9 space-y-6 text-base leading-8 text-text-primary/75 sm:text-lg">{paragraphs.map((paragraph, index) => <div key={`${index}-${paragraph.slice(0, 12)}`}><p className="whitespace-pre-line">{paragraph}</p>{photos[index + 1] && <figure className="my-8 overflow-hidden rounded-2xl border border-text-primary/10 bg-bg-secondary"><img src={photos[index + 1]} alt={`${entry.role} at ${entry.organization}, moment ${index + 1}`} className="max-h-[32rem] w-full object-cover" loading="lazy" /></figure>}</div>)}</div>
          {photos.slice(Math.max(1, paragraphs.length + 1)).map((photo, index) => <img key={`${photo}-${index}`} src={photo} alt={`${entry.role} at ${entry.organization}, moment ${index + 1}`} className="my-8 max-h-[32rem] w-full rounded-2xl object-cover" loading="lazy" />)}
        </div>
      </Motion.article>
    </Motion.div>
  )
}

export default function ExperiencePage() {
  const [entries, setEntries] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { let active = true; getExperience().then(data => { if (active) setEntries(data) }).catch(() => { if (active) setError('Experience is temporarily unavailable.') }); return () => { active = false } }, [])

  return (
    <main className="min-h-screen border-x-2 border-dotted border-bg-tertiary bg-bg-primary px-5 py-20 text-text-primary sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Motion.header initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 sm:mb-16"><h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl" style={{ fontFamily: "'Caveat', cursive" }}>Experience</h2></Motion.header>
        {entries.length ? <div className="relative mx-auto max-w-2xl before:absolute before:bottom-4 before:left-[-16px] before:top-4 before:w-px before:bg-text-primary/15">
          <div className="space-y-5 sm:space-y-7">{entries.map((entry, index) => <Motion.button key={entry.id} type="button" onClick={() => setSelected(entry)} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="group relative block w-full text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-tertiary">
            <span className="block rounded-2xl border border-text-primary/10 bg-bg-secondary p-5 transition duration-300 group-hover:-translate-y-1 group-hover:border-text-primary/25 group-hover:shadow-xl sm:p-6">
              <span className="mb-3 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary"><FiCalendar /> {monthYear(entry.startDate)} — {entry.endDate ? monthYear(entry.endDate) : 'Present'}</span>
              <span className="block text-xl font-semibold tracking-tight">{entry.role}</span>
              <span className="mt-1 block text-sm text-text-primary/55">{entry.organization}</span>
              {entry.photos?.[0] && <img src={entry.photos[0]} alt="" className="mt-4 h-36 w-full rounded-xl object-cover" loading="lazy" />}
              <span className="mt-4 flex items-center justify-center gap-1 text-xs text-text-primary/50 group-hover:text-text-primary">View experience <FiArrowUpRight /></span>
            </span>
          </Motion.button>)}</div>
        </div> : <div className="rounded-3xl border border-dashed border-text-primary/15 px-6 py-16 text-center"><FiBriefcase className="mx-auto text-text-primary/25" size={28} /><p className="mt-4 text-sm text-text-primary/50">Work experience will appear here.</p></div>}
        {error && <p role="status" className="mt-6 text-center text-sm text-text-tertiary">{error}</p>}
      </div>
      <AnimatePresence>{selected && <Story entry={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </main>
  )
}
