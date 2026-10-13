import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiCalendar, FiCamera, FiX } from 'react-icons/fi'
import { getHackathons } from '../lib/hackathons'

function formatDate(value) {
  if (!value) return 'Date to be announced'
  return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
}

function Story({ hackathon, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = event => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape) }
  }, [onClose])

  const paragraphs = (hackathon.longDescription || hackathon.description || '').split(/\n\s*\n/).filter(Boolean)
  const photos = hackathon.photos || []
  return (
    <Motion.div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <Motion.article role="dialog" aria-modal="true" aria-labelledby="story-title" className="relative max-h-[96dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-text-primary/10 bg-bg-primary text-text-primary shadow-2xl sm:rounded-3xl" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
        <button onClick={onClose} aria-label="Close story" className="sticky top-4 z-20 float-right mr-4 mt-4 rounded-full border border-white/15 bg-bg-primary/80 p-2 backdrop-blur"><FiX /></button>
        {photos[0] && <div className="h-56 sm:h-80"><img src={photos[0]} alt={`${hackathon.title} event`} className="h-full w-full object-cover" /></div>}
        <div className="mx-auto max-w-2xl px-6 py-8 sm:px-12 sm:py-12">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[.2em] text-text-tertiary"><FiCalendar /> {formatDate(hackathon.date)}</p>
          <h2 id="story-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">{hackathon.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-text-primary/65">{hackathon.description}</p>
          <div className="mt-9 space-y-6 text-base leading-8 text-text-primary/75 sm:text-lg">
            {paragraphs.map((paragraph, index) => <div key={`${index}-${paragraph.slice(0, 12)}`}>
              <p className="whitespace-pre-line">{paragraph}</p>
              {photos[index + 1] && <figure className="my-8 overflow-hidden rounded-2xl border border-text-primary/10 bg-bg-secondary"><img src={photos[index + 1]} alt={`${hackathon.title} moment ${index + 1}`} className="max-h-[32rem] w-full object-cover" loading="lazy" /></figure>}
            </div>)}
          </div>
          {photos.slice(Math.max(1, paragraphs.length + 1)).map((photo, index) => <img key={photo} src={photo} alt={`${hackathon.title} moment ${index + 1}`} className="my-8 max-h-[32rem] w-full rounded-2xl object-cover" loading="lazy" />)}
          {!!hackathon.links?.length && <div className="mt-10 flex flex-wrap gap-3 border-t border-text-primary/10 pt-6">{hackathon.links.map(link => <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-text-primary/15 px-4 py-2 text-sm transition hover:bg-bg-secondary">{link.label}<FiArrowUpRight /></a>)}</div>}
        </div>
      </Motion.article>
    </Motion.div>
  )
}

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { let active = true; getHackathons().then(data => { if (active) setHackathons(data) }).catch(() => { if (active) setError('Hackathons are temporarily unavailable.') }); return () => { active = false } }, [])

  return (
    <main className="min-h-screen border-x-2 border-dotted border-bg-tertiary bg-bg-primary px-5 py-20 text-text-primary sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Motion.header initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end">
          <div><p className="mb-3 font-mono text-xs uppercase tracking-[.25em] text-text-tertiary">Build · learn · repeat</p><h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">Hackathon journal<span className="text-text-tertiary">.</span></h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-text-primary/50 sm:text-base">Ideas built under a deadline, new teammates, and the little moments that made each event memorable.</p></div>
          <p className="font-mono text-xs text-text-primary/35">{String(hackathons.length).padStart(2, '0')} STORIES</p>
        </Motion.header>
        {hackathons.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((item, index) => <Motion.button key={item.id || item.title} type="button" onClick={() => setSelected(item)} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="group overflow-hidden rounded-2xl border border-text-primary/10 bg-bg-secondary text-left transition duration-300 hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-tertiary">
            <div className="relative h-56 overflow-hidden bg-bg-primary">{item.photos?.[0] ? <img src={item.photos[0]} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" /> : <div className="flex h-full items-center justify-center text-text-primary/20"><FiCamera size={34} /></div>}<span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">{formatDate(item.date)}</span></div>
            <div className="p-5 sm:p-6"><div className="mb-3 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-text-tertiary">Event {String(index + 1).padStart(2, '0')}</span><FiArrowUpRight className="text-text-primary/35 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-text-primary" /></div><h3 className="text-xl font-semibold tracking-tight">{item.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-primary/55">{item.description}</p><span className="mt-5 inline-block text-xs font-medium text-text-primary/75">Read the story <span aria-hidden="true">↗</span></span></div>
          </Motion.button>)}
        </div> : <div className="rounded-3xl border border-dashed border-text-primary/15 px-6 py-16 text-center sm:py-24"><p className="font-mono text-xs uppercase tracking-[.2em] text-text-primary/35">The next story is waiting</p><p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-primary/55">Hackathon stories will appear here. Add your first one from the portfolio admin.</p></div>}
        {error && <p role="status" className="mt-6 text-sm text-text-tertiary">{error}</p>}
      </div>
      <AnimatePresence>{selected && <Story hackathon={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </main>
  )
}
