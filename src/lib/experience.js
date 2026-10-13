import { isSupabaseConfigured, supabase } from './supabase'

export async function getExperience() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase.from('experience_entries').select('*').order('start_date', { ascending: false })
  if (error) throw error
  return data.map(({ id, role, organization, start_date, end_date, description, photos, position }) => ({
    id, role, organization, startDate: start_date, endDate: end_date, current: !end_date, description, photos: photos || [], position,
  }))
}

export async function saveExperience(entry) {
  const record = {
    role: entry.role.trim(),
    organization: entry.organization.trim(),
    start_date: entry.startDate || null,
    end_date: entry.current ? null : entry.endDate || null,
    description: (entry.description || '').trim(),
    photos: entry.photos || [],
    position: entry.position || 0,
  }
  const query = entry.id
    ? supabase.from('experience_entries').update(record).eq('id', entry.id)
    : supabase.from('experience_entries').insert(record)
  const { error } = await query
  if (error) throw error
}

export async function deleteExperience(id) {
  const { error } = await supabase.from('experience_entries').delete().eq('id', id)
  if (error) throw error
}

export async function uploadExperiencePhoto(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'image'
  const path = `experience/${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('project-images').upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw error
  return supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl
}
