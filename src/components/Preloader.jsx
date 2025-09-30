import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import App from '../App.jsx'

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasFallen, setHasFallen] = useState(false)

  useEffect(() => {
    const finishLoading = () => {
      setTimeout(() => setIsLoading(false), 100)
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading)
      window.addEventListener('DOMContentLoaded', finishLoading)
    }

    return () => {
      window.removeEventListener('load', finishLoading)
      window.removeEventListener('DOMContentLoaded', finishLoading)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={
            hasFallen
              ? { y: [0, -10, 0, -10, 0], opacity: 1 }
              : { y: 0, opacity: 1 }
          }
          transition={
            hasFallen
              ? {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }
              : {
                  duration: 1,
                  ease: 'easeOut',
                  onComplete: () => setHasFallen(true),
                }
          }
          className="text-4xl text-white font-cursive"
        >
          nikhil
        </motion.h1>
      </div>
    )
  }

  return <App />
}

export default Preloader