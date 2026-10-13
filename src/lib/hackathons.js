import { isSupabaseConfigured, supabase } from './supabase'

export async function getHackathons() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase.from('hackathons').select('*').order('event_date', { ascending: false })
  if (error) throw error
  return data.map(({ id, title, description, long_description, event_date, photos, links, position }) => ({
    id, title, description, longDescription: long_description, date: event_date, photos: photos || [], links: links || [], position,
  }))
}

export async function saveHackathon(hackathon) {
  const record = {
    title: hackathon.title.trim(),
    description: hackathon.description.trim(),
    long_description: (hackathon.longDescription || '').trim(),
    event_date: hackathon.date || null,
    photos: hackathon.photos || [],
    links: hackathon.links || [],
    position: hackathon.position || 0,
  }
  const query = hackathon.id
    ? supabase.from('hackathons').update(record).eq('id', hackathon.id)
    : supabase.from('hackathons').insert(record)
  const { error } = await query
  if (error) throw error
}

export async function deleteHackathon(id) {
  const { error } = await supabase.from('hackathons').delete().eq('id', id)
  if (error) throw error
}

export async function uploadHackathonImage(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'image'
  const path = `hackathons/${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('project-images').upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw error
  return supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl
}
