import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import App from '../App.jsx'

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <svg
              role="img"
              aria-label="nikhilchouksey"
              viewBox="0 0 820 130"
              className="w-[min(90vw,760px)] overflow-visible"
            >
              <motion.text
                x="410"
                y="100"
                textAnchor="middle"
                fontFamily="'Cedarville Cursive', cursive"
                fontSize="82"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ strokeDasharray: 1050, strokeDashoffset: 1050, fillOpacity: 0 }}
                animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
                transition={{
                  strokeDashoffset: { duration: 1.15, delay: 0.05, ease: 'easeInOut' },
                  fillOpacity: { duration: 0.85, delay: 0.08, ease: 'easeInOut' },
                }}
                className="text-white"
              >
                nikhilchouksey
              </motion.text>
            </svg>
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
