import  React , {useRef}  from 'react' ; 

export  default function useClickSound(soundFile){

  const audioRef = useRef(new Audio(soundFile)); 

  const playSound = ()=>{
    const audio = audioRef.current ; 
    audio.currentTime = 0 ; 
    audio.play() ;
    audio.volume = 1 ; 
    console.log("sound play")
  }

  return playSound ; 
}