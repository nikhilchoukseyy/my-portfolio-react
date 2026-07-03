import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { SOCIAL_LINKS } from '../config/socials.config'


const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
}
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}
const ContactMe = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', text: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const sendEmail = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setFeedback({ type: 'error', text: 'Please fill in all fields.' })
      return
    }

    setLoading(true)
    setFeedback({ type: '', text: '' })

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { from_name: form.name, from_email: form.email, message: form.message },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setLoading(false)
        setFeedback({ type: 'success', text: 'Message sent! I\'ll get back to you soon.' })
        setForm({ name: '', email: '', message: '' })
      })
      .catch(() => {
        setLoading(false)
        setFeedback({ type: 'error', text: 'Something went wrong. Try again.' })
      })
  }

  const inputClass = "w-full bg-bg-primary border border-text-primary/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-tertiary/40 font-mono outline-none focus:border-text-primary/30 focus:ring-1 focus:ring-text-primary/10 transition-all duration-200"

  return (
    <section className="bg-bg-primary min-h-screen flex flex-col items-center justify-center text-text-primary border-bg-tertiary border-dotted border-2 border-t-0 py-16 px-5 pb-28 sm:pb-16">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-tertiary/60 block mb-2">
          Let's connect
        </span>
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight"
          style={{ fontFamily: "'Google Sans Code', monospace" }}
        >
          Contact Me
        </h2>
        <div className="w-8 h-px bg-text-primary/20 mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-bg-secondary border border-text-primary/6 rounded-2xl p-6 sm:p-8 shadow-xl">

          <form onSubmit={sendEmail} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest uppercase text-text-tertiary/50">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest uppercase text-text-tertiary/50">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest uppercase text-text-tertiary/50">Message</label>
              <textarea
                name="message"
                placeholder="What's on your mind..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback.text && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-center gap-2 text-xs font-mono rounded-lg px-3 py-2.5 ${feedback.type === 'success'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                >
                  {feedback.type === 'success' ? <FiCheck size={13} /> : <FiAlertCircle size={13} />}
                  {feedback.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
              whileTap={{ scale: 0.97 }}
              animate={feedback.type === 'error' ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-center gap-2 w-full bg-text-primary text-bg-primary font-mono font-bold text-sm py-3 rounded-xl shadow-lg transition-opacity mt-1 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
                }`}
            >
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-bg-primary/30 border-t-bg-primary animate-spin" />
              ) : (
                <>
                  <FiSend size={14} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
      
    </section>
  )
}

export default ContactMe