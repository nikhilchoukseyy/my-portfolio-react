import { PROJECTS as DEFAULT_PROJECTS } from '../config/projects.config'
import { isSupabaseConfigured, supabase } from './supabase'

export async function getProjects() {
  if (!isSupabaseConfigured) return DEFAULT_PROJECTS

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('position', { ascending: true })
  if (error) throw error
  return data.map(({ id, title, description, live_url, github_url, accent, image_url, tags, position }) => ({
    id, title, desc: description, live: live_url, github: github_url, accent, image: image_url, tags, position,
  }))
}

export async function saveProject(project) {
  const record = {
    title: project.title.trim(),
    description: project.desc.trim(),
    live_url: project.live.trim(),
    github_url: project.github.trim(),
    accent: project.accent,
    image_url: project.image,
    tags: project.tags,
    position: project.position,
  }
  const query = project.id
    ? supabase.from('projects').update(record).eq('id', project.id)
    : supabase.from('projects').insert(record)
  const { error } = await query
  if (error) throw error
}

export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

export async function updateProjectOrder(projects) {
  const results = await Promise.all(projects.map((project, position) =>
    supabase.from('projects').update({ position }).eq('id', project.id),
  ))
  const failed = results.find(({ error }) => error)
  if (failed) throw failed.error
}

export async function uploadProjectImage(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'image'
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('project-images').upload(path, file, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw error
  return supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl
}

export async function importDefaultProjects() {
  const records = DEFAULT_PROJECTS.map((project, position) => ({
    title: project.title,
    description: project.desc,
    live_url: project.live,
    github_url: project.github,
    accent: project.accent,
    image_url: project.image,
    tags: project.tags || [],
    position,
  }))
  const { error } = await supabase.from('projects').insert(records)
  if (error) throw error
}
