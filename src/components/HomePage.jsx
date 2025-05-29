import React from 'react'
import { Typewriter } from 'react-simple-typewriter';


const HomePage = () => {
  return (
    <div className='bg-black h-[100vh] flex flex-col text-white'>
      <nav className='h-[20vh]'></nav>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='gap-2 text-4xl flex flex-col text-center items-center justify-center md:flex-row'>
          Hello I am 
          <span className='text-4xl text-blue-500'>
            <Typewriter
              words={[' Nikhil!', ' a web developer', ' problem solver']}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={3000}
            />
          </span>
        </h1>
      </div>
    </div>
  )
}

export default HomePage