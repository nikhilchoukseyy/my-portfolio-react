import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { deleteProject, getProjects, importDefaultProjects, saveProject, updateProjectOrder, uploadProjectImage } from '../lib/projects'

const emptyProject = { title: '', desc: '', live: '', github: '', image: '', accent: ['#7c3aed', '#06b6d4'], tags: [] }

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
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadProjects = useCallback(async () => {
    setError('')
    try { setProjects(await getProjects()) }
    catch (cause) { setError(cause.message || 'Could not load projects. Check your Supabase setup and SQL.') }
  }, [])

  useEffect(() => {
    if (!supabase) { setSessionReady(true); return undefined }
    supabase.auth.getSession().then(({ data }) => { setSignedIn(Boolean(data.session)); setSessionReady(true) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)))
    return () => listener.subscription.unsubscribe()
  }, [])
  useEffect(() => { if (signedIn) loadProjects() }, [signedIn, loadProjects])

  if (!isSupabaseConfigured) return <Navigate to="/admin/login" replace />
  if (!sessionReady) return <div className="min-h-screen bg-bg-primary" />
  if (!signedIn) return <Navigate to="/admin/login" replace />

  async function run(action, success) {
    setBusy(true); setError(''); setMessage('')
    try { await action(); await loadProjects(); setEditing(null); setMessage(success) }
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
          <div><a href="/" className="text-sm text-text-tertiary">← View portfolio</a><h1 className="mt-2 text-3xl font-semibold">Portfolio admin</h1><p className="mt-1 text-sm opacity-60">Manage projects shown on your portfolio.</p></div>
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
      </div>
    </main>
  )
}
