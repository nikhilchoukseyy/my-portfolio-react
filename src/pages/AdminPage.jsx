import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { deleteProject, getProjects, importDefaultProjects, saveProject, updateProjectOrder, uploadProjectImage } from '../lib/projects'
import { deleteHackathon, getHackathons, saveHackathon, uploadHackathonImage } from '../lib/hackathons'
import { deleteExperience, getExperience, saveExperience, uploadExperiencePhoto } from '../lib/experience'

const emptyProject = { title: '', desc: '', live: '', github: '', image: '', accent: ['#7c3aed', '#06b6d4'], tags: [] }
const emptyHackathon = { title: '', description: '', longDescription: '', date: '', photos: [], links: [] }
const emptyExperience = { role: '', organization: '', startDate: '', endDate: '', current: true, description: '', photos: [] }

function ExperienceForm({ entry, onSave, onCancel, busy }) {
  const [draft, setDraft] = useState({ ...emptyExperience, ...entry })
  const [photoBusy, setPhotoBusy] = useState(false)
  const [photoError, setPhotoError] = useState('')
  const set = (key, value) => setDraft(current => ({ ...current, [key]: value }))
  async function addPhotos(event) {
    const files = [...(event.target.files || [])]
    if (!files.length) return
    if (files.some(file => !file.type.startsWith('image/'))) { setPhotoError('Choose image files only.'); return }
    setPhotoBusy(true); setPhotoError('')
    try { const uploaded = await Promise.all(files.map(uploadExperiencePhoto)); const existing = Array.isArray(draft.photos) ? draft.photos : draft.photos.split('\n').map(url => url.trim()).filter(Boolean); set('photos', [...existing, ...uploaded]) }
    catch (cause) { setPhotoError(cause.message || 'Photo upload failed.') }
    finally { setPhotoBusy(false); event.target.value = '' }
  }
  const photosText = Array.isArray(draft.photos) ? draft.photos.join('\n') : draft.photos || ''
  return <form onSubmit={event => { event.preventDefault(); onSave({ ...draft, photos: typeof draft.photos === 'string' ? draft.photos.split('\n').map(url => url.trim()).filter(Boolean) : draft.photos }) }} className="grid gap-4 rounded-xl border border-text-primary/10 bg-bg-primary p-5 md:grid-cols-2">
    <label className="text-sm">Position / role<input required value={draft.role} onChange={event => set('role', event.target.value)} placeholder="Software Engineer Intern" className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm">Company / organization<input required value={draft.organization} onChange={event => set('organization', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm">Start date<input required type="date" value={draft.startDate || ''} onChange={event => set('startDate', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="flex items-center gap-2 self-end pb-2 text-sm"><input type="checkbox" checked={Boolean(draft.current)} onChange={event => { set('current', event.target.checked); if (event.target.checked) set('endDate', '') }} /> I currently work here</label>
    {!draft.current && <label className="text-sm">End date<input required type="date" value={draft.endDate || ''} onChange={event => set('endDate', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>}
    <label className="text-sm md:col-span-2">What you worked on<textarea rows="8" value={draft.description} onChange={event => set('description', event.target.value)} placeholder="Describe your work. Leave a blank line between paragraphs to place photos between them." className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm md:col-span-2">Photo URLs (one per line)<textarea rows="3" value={photosText} onChange={event => set('photos', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm">Upload photos<input type="file" multiple accept="image/*" onChange={addPhotos} className="mt-2 block w-full text-sm" /></label>
    <div className="flex flex-wrap gap-2">{(Array.isArray(draft.photos) ? draft.photos : []).map((photo, index) => <div key={`${photo}-${index}`} className="relative"><img src={photo} alt={`Experience photo ${index + 1}`} className="h-16 w-20 rounded-md object-cover" /><button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => set('photos', draft.photos.filter((_, photoIndex) => photoIndex !== index))} className="absolute -right-2 -top-2 rounded-full bg-bg-primary px-1.5">×</button></div>)}</div>
    {(photoBusy || photoError) && <p className="text-sm text-text-tertiary md:col-span-2">{photoBusy ? 'Uploading photos…' : photoError}</p>}
    <div className="flex gap-3 md:col-span-2"><button disabled={busy || photoBusy} className="rounded-lg bg-text-primary px-4 py-2 font-medium text-bg-primary disabled:opacity-50">{busy ? 'Saving…' : 'Save experience'}</button><button type="button" onClick={onCancel} className="rounded-lg border border-text-primary/20 px-4 py-2">Cancel</button></div>
  </form>
}

function HackathonForm({ hackathon, onSave, onCancel, busy }) {
  const [draft, setDraft] = useState({ ...emptyHackathon, ...hackathon })
  const [imageBusy, setImageBusy] = useState(false)
  const [imageError, setImageError] = useState('')
  const set = (key, value) => setDraft(current => ({ ...current, [key]: value }))
  async function addPhotos(event) {
    const files = [...(event.target.files || [])]
    if (!files.length) return
    if (files.some(file => !file.type.startsWith('image/'))) { setImageError('Choose image files only.'); return }
    setImageBusy(true); setImageError('')
    try { const uploaded = await Promise.all(files.map(uploadHackathonImage)); const existing = Array.isArray(draft.photos) ? draft.photos : draft.photos.split('\n').map(url => url.trim()).filter(Boolean); set('photos', [...existing, ...uploaded]) }
    catch (cause) { setImageError(cause.message || 'Image upload failed.') }
    finally { setImageBusy(false); event.target.value = '' }
  }
  const photosText = Array.isArray(draft.photos) ? draft.photos.join('\n') : draft.photos || ''
  const linksText = Array.isArray(draft.links) ? draft.links.map(link => `${link.label} | ${link.url}`).join('\n') : draft.links || ''
  return <form onSubmit={event => { event.preventDefault(); onSave({ ...draft, photos: typeof draft.photos === 'string' ? draft.photos.split('\n').map(url => url.trim()).filter(Boolean) : draft.photos, links: typeof draft.links === 'string' ? draft.links.split('\n').map(line => { const [label, ...url] = line.split('|'); return { label: label.trim(), url: url.join('|').trim() } }).filter(link => link.label && link.url) : draft.links }) }} className="grid gap-4 rounded-xl border border-text-primary/10 bg-bg-primary p-5 md:grid-cols-2">
    <label className="text-sm">Event name<input required value={draft.title} onChange={event => set('title', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm">Event date<input type="date" value={draft.date || ''} onChange={event => set('date', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm md:col-span-2">Card description<textarea rows="2" value={draft.description} onChange={event => set('description', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm md:col-span-2">Full story<textarea rows="8" value={draft.longDescription} onChange={event => set('longDescription', event.target.value)} placeholder="Write your story. Leave a blank line between paragraphs; photos will appear between them." className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm md:col-span-2">Photo URLs (one per line)<textarea rows="3" value={photosText} onChange={event => set('photos', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    <label className="text-sm">Upload photos<input type="file" multiple accept="image/*" onChange={addPhotos} className="mt-2 block w-full text-sm" /></label>
    <div className="flex flex-wrap gap-2">{(Array.isArray(draft.photos) ? draft.photos : []).map((photo, index) => <div key={`${photo}-${index}`} className="relative"><img src={photo} alt={`Photo ${index + 1}`} className="h-16 w-20 rounded-md object-cover" /><button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => set('photos', draft.photos.filter((_, photoIndex) => photoIndex !== index))} className="absolute -right-2 -top-2 rounded-full bg-bg-primary px-1.5">×</button></div>)}</div>
    <label className="text-sm md:col-span-2">Links (one per line: Label | URL)<textarea rows="3" value={linksText} onChange={event => set('links', event.target.value)} placeholder={'Project | https://…\nEvent page | https://…'} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
    {(imageBusy || imageError) && <p className="text-sm text-text-tertiary md:col-span-2">{imageBusy ? 'Uploading photos…' : imageError}</p>}
    <div className="flex gap-3 md:col-span-2"><button disabled={busy || imageBusy} className="rounded-lg bg-text-primary px-4 py-2 font-medium text-bg-primary disabled:opacity-50">{busy ? 'Saving…' : 'Save hackathon'}</button><button type="button" onClick={onCancel} className="rounded-lg border border-text-primary/20 px-4 py-2">Cancel</button></div>
  </form>
}

function ProjectForm({ project, onSave, onCancel, busy }) {
  const [draft, setDraft] = useState({ ...emptyProject, ...project })
  const [imageBusy, setImageBusy] = useState(false)
  const [imageError, setImageError] = useState('')
  const set = (key, value) => setDraft(current => ({ ...current, [key]: value }))

  async function handleImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setImageError('Choose an image file.'); return }
    setImageBusy(true)
    setImageError('')
    try { set('image', await uploadProjectImage(file)) }
    catch (error) { setImageError(error.message || 'Image upload failed.') }
    finally { setImageBusy(false) }
  }

  return (
    <form onSubmit={event => { event.preventDefault(); onSave({ ...draft, tags: typeof draft.tags === 'string' ? draft.tags.split(',').map(tag => tag.trim()).filter(Boolean) : draft.tags }) }} className="grid gap-4 rounded-xl border border-text-primary/10 bg-bg-primary p-5 md:grid-cols-2">
      {[['title', 'Project name'], ['live', 'Live URL'], ['github', 'GitHub URL']].map(([key, label]) => <label key={key} className="text-sm">{label}<input required={key === 'title'} value={draft[key] || ''} onChange={event => set(key, event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>)}
      <label className="text-sm">Tags (comma separated)<input value={Array.isArray(draft.tags) ? draft.tags.join(', ') : draft.tags || ''} onChange={event => set('tags', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
      <label className="text-sm md:col-span-2">Description<textarea rows="4" value={draft.desc || ''} onChange={event => set('desc', event.target.value)} className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
      <label className="text-sm md:col-span-2">Image URL<input value={draft.image || ''} onChange={event => set('image', event.target.value)} placeholder="Paste an image URL or upload below" className="mt-1 w-full rounded-lg border border-text-primary/15 bg-bg-secondary px-3 py-2" /></label>
      <label className="text-sm">Upload image<input type="file" accept="image/*" onChange={handleImage} className="mt-2 block w-full text-sm" /></label>
      {draft.image && <img src={draft.image} alt="Project preview" className="h-24 max-w-full rounded-lg object-contain" />}
      {(imageBusy || imageError) && <p className="text-sm text-text-tertiary md:col-span-2">{imageBusy ? 'Uploading image…' : imageError}</p>}
      <div className="flex gap-3 md:col-span-2">
        <button disabled={busy || imageBusy} className="rounded-lg bg-text-primary px-4 py-2 font-medium text-bg-primary disabled:opacity-50">{busy ? 'Saving…' : 'Save project'}</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-text-primary/20 px-4 py-2">Cancel</button>
      </div>
    </form>
  )
}

export default function AdminPage() {
  const navigate = useNavigate()
  const [sessionReady, setSessionReady] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [projects, setProjects] = useState([])
  const [hackathons, setHackathons] = useState([])
  const [experience, setExperience] = useState([])
  const [editing, setEditing] = useState(null)
  const [editingHackathon, setEditingHackathon] = useState(null)
  const [editingExperience, setEditingExperience] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadProjects = useCallback(async () => {
    setError('')
    try { setProjects(await getProjects()) }
    catch (cause) { setError(cause.message || 'Could not load projects. Check your Supabase setup and SQL.') }
  }, [])
  const loadHackathons = useCallback(async () => {
    try { setHackathons(await getHackathons()) }
    catch (cause) { setError(cause.message || 'Could not load hackathons. Check your Supabase setup and SQL.') }
  }, [])
  const loadExperience = useCallback(async () => {
    try { setExperience(await getExperience()) }
    catch (cause) { setError(cause.message || 'Could not load experience entries. Check your Supabase setup and SQL.') }
  }, [])

  useEffect(() => {
    if (!supabase) { setSessionReady(true); return undefined }
    supabase.auth.getSession().then(({ data }) => { setSignedIn(Boolean(data.session)); setSessionReady(true) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)))
    return () => listener.subscription.unsubscribe()
  }, [])
  useEffect(() => { if (signedIn) { loadProjects(); loadHackathons(); loadExperience() } }, [signedIn, loadProjects, loadHackathons, loadExperience])

  if (!isSupabaseConfigured) return <Navigate to="/admin/login" replace />
  if (!sessionReady) return <div className="min-h-screen bg-bg-primary" />
  if (!signedIn) return <Navigate to="/admin/login" replace />

  async function run(action, success) {
    setBusy(true); setError(''); setMessage('')
    try { await action(); await loadProjects(); await loadHackathons(); await loadExperience(); setEditing(null); setEditingHackathon(null); setEditingExperience(null); setMessage(success) }
    catch (cause) { setError(cause.message || 'The change could not be saved.') }
    finally { setBusy(false) }
  }

  async function logout() { await supabase.auth.signOut(); navigate('/admin/login', { replace: true }) }

  async function move(index, offset) {
    const reordered = [...projects]
    const target = index + offset
    if (target < 0 || target >= reordered.length) return
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    setProjects(reordered)
    await run(() => updateProjectOrder(reordered), 'Project order updated.')
  }

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-8 text-text-primary sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><a href="/" className="text-sm text-text-tertiary">← View portfolio</a><h1 className="mt-2 text-3xl font-semibold">Portfolio admin</h1><p className="mt-1 text-sm opacity-60">Manage projects and hackathon stories.</p></div>
          <button onClick={logout} className="rounded-lg border border-text-primary/20 px-4 py-2 text-sm">Sign out</button>
        </header>
        {message && <p role="status" className="mb-4 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</p>}
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
        {editing && <section className="mb-8"><h2 className="mb-3 text-xl font-medium">{editing.id ? 'Edit project' : 'Add project'}</h2><ProjectForm project={editing} busy={busy} onCancel={() => setEditing(null)} onSave={project => run(() => saveProject({ ...project, position: editing.position ?? projects.length }), editing.id ? 'Project saved.' : 'Project added.')} /></section>}
        <div className="mb-4 flex flex-wrap gap-3">
          <button onClick={() => setEditing({ ...emptyProject })} className="rounded-lg bg-text-primary px-4 py-2 font-medium text-bg-primary">+ Add project</button>
          {!projects.length && <button disabled={busy} onClick={() => run(importDefaultProjects, 'Current projects imported.')} className="rounded-lg border border-text-primary/20 px-4 py-2 disabled:opacity-50">Import current portfolio projects</button>}
        </div>
        <div className="space-y-3">
          {projects.map((project, index) => <article key={project.id || project.title} className="flex flex-wrap items-center gap-4 rounded-xl border border-text-primary/10 bg-bg-secondary p-4">
            <span className="w-8 font-mono text-sm opacity-50">{String(index + 1).padStart(2, '0')}</span>
            {project.image && <img src={project.image} alt="" className="h-14 w-20 rounded-md bg-bg-primary object-contain" />}
            <div className="min-w-40 flex-1"><h2 className="font-medium">{project.title}</h2><p className="line-clamp-1 text-sm opacity-60">{project.desc}</p></div>
            <div className="flex gap-2"><button aria-label={`Move ${project.title} up`} onClick={() => move(index, -1)} disabled={index === 0 || busy} className="rounded border border-text-primary/15 px-3 py-2 disabled:opacity-30">↑</button><button aria-label={`Move ${project.title} down`} onClick={() => move(index, 1)} disabled={index === projects.length - 1 || busy} className="rounded border border-text-primary/15 px-3 py-2 disabled:opacity-30">↓</button><button onClick={() => setEditing({ ...project })} className="rounded border border-text-primary/15 px-3 py-2">Edit</button><button onClick={() => { if (window.confirm(`Delete “${project.title}”?`)) run(() => deleteProject(project.id), 'Project deleted.') }} disabled={busy} className="rounded border border-red-400/30 px-3 py-2 text-red-300 disabled:opacity-50">Delete</button></div>
          </article>)}
          {!projects.length && !error && <p className="rounded-xl border border-dashed border-text-primary/20 p-8 text-center text-sm opacity-60">No projects yet. Import the current list or add your first project.</p>}
        </div>
        <section className="mt-14 border-t border-text-primary/10 pt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-semibold">Experience</h2><p className="mt-1 text-sm opacity-60">Positions, dates, work descriptions, and photos.</p></div><button onClick={() => { setEditing(null); setEditingHackathon(null); setEditingExperience({ ...emptyExperience }) }} className="rounded-lg bg-text-primary px-4 py-2 font-medium text-bg-primary">+ Add experience</button></div>
          {editingExperience && <div className="mb-7"><h3 className="mb-3 text-lg font-medium">{editingExperience.id ? 'Edit experience' : 'Add experience'}</h3><ExperienceForm entry={editingExperience} busy={busy} onCancel={() => setEditingExperience(null)} onSave={entry => run(() => saveExperience({ ...entry, position: entry.position ?? experience.length }), editingExperience.id ? 'Experience saved.' : 'Experience added.')} /></div>}
          <div className="space-y-3">{experience.map(entry => <article key={entry.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-text-primary/10 bg-bg-secondary p-4">{entry.photos?.[0] && <img src={entry.photos[0]} alt="" className="h-14 w-20 rounded-md object-cover" />}<div className="min-w-40 flex-1"><h3 className="font-medium">{entry.role} · {entry.organization}</h3><p className="line-clamp-1 text-sm opacity-60">{entry.startDate || 'Start date not set'} – {entry.endDate || 'Present'}</p></div><div className="flex gap-2"><button onClick={() => { setEditing(null); setEditingHackathon(null); setEditingExperience({ ...entry }) }} className="rounded border border-text-primary/15 px-3 py-2">Edit</button><button onClick={() => { if (window.confirm(`Delete “${entry.role} at ${entry.organization}”?`)) run(() => deleteExperience(entry.id), 'Experience entry deleted.') }} disabled={busy} className="rounded border border-red-400/30 px-3 py-2 text-red-300 disabled:opacity-50">Delete</button></div></article>)}{!experience.length && !error && <p className="rounded-xl border border-dashed border-text-primary/20 p-8 text-center text-sm opacity-60">No experience entries yet. Add your first role above.</p>}</div>
        </section>
        <section className="mt-14 border-t border-text-primary/10 pt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-semibold">Hackathons</h2><p className="mt-1 text-sm opacity-60">Stories, dates, photos, and useful links.</p></div><button onClick={() => { setEditing(null); setEditingHackathon({ ...emptyHackathon }) }} className="rounded-lg bg-text-primary px-4 py-2 font-medium text-bg-primary">+ Add hackathon</button></div>
          {editingHackathon && <div className="mb-7"><h3 className="mb-3 text-lg font-medium">{editingHackathon.id ? 'Edit hackathon' : 'Add hackathon'}</h3><HackathonForm hackathon={editingHackathon} busy={busy} onCancel={() => setEditingHackathon(null)} onSave={entry => run(() => saveHackathon({ ...entry, position: entry.position ?? hackathons.length }), editingHackathon.id ? 'Hackathon saved.' : 'Hackathon added.')} /></div>}
          <div className="space-y-3">{hackathons.map(item => <article key={item.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-text-primary/10 bg-bg-secondary p-4">{item.photos?.[0] && <img src={item.photos[0]} alt="" className="h-14 w-20 rounded-md object-cover" />}<div className="min-w-40 flex-1"><h3 className="font-medium">{item.title}</h3><p className="line-clamp-1 text-sm opacity-60">{item.date || 'Date not set'} · {item.description}</p></div><div className="flex gap-2"><button onClick={() => { setEditing(null); setEditingHackathon({ ...item }) }} className="rounded border border-text-primary/15 px-3 py-2">Edit</button><button onClick={() => { if (window.confirm(`Delete “${item.title}”?`)) run(() => deleteHackathon(item.id), 'Hackathon deleted.') }} disabled={busy} className="rounded border border-red-400/30 px-3 py-2 text-red-300 disabled:opacity-50">Delete</button></div></article>)}{!hackathons.length && !error && <p className="rounded-xl border border-dashed border-text-primary/20 p-8 text-center text-sm opacity-60">No hackathons yet. Add your first story above.</p>}</div>
        </section>
      </div>
    </main>
  )
}
