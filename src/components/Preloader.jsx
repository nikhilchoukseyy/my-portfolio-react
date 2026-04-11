import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import App from '../App.jsx'

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 18
      })
    }, 120)

    const finishLoading = () => {
      setTimeout(() => setIsLoading(false), 2400)
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading)
      window.addEventListener('DOMContentLoaded', finishLoading)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', finishLoading)
      window.removeEventListener('DOMContentLoaded', finishLoading)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <h1
              className="text-5xl sm:text-6xl font-black tracking-tight text-text-primary"
              style={{ fontFamily: "'Google Sans Code', monospace" }}
            >
              nikhil
              <span className="opacity-25">.</span>
            </h1>

            {/* Progress bar */}
            <div className="w-32 sm:w-48 h-px bg-text-primary/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-text-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.4 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-tertiary"
            >
              loading
            </motion.span>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <App />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader