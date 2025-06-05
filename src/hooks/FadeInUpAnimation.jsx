import React from 'react'

const FadeInUpAnimation = {
  hidden: {
    opacity: 0,
    y: 50
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 1
    },
  },
}

export default FadeInUpAnimation
 