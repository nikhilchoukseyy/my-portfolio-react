import React , {useState , useEffect} from 'react'


export default function useScrollDirection() {
  const [scrollUp , setScrollUp] = useState(true); 
  const [lastScrollY,setLastScrollY] = useState(0) ; 

  useEffect(()=>{
    const handleScroll = ()=>{
      const currrentScrollY = window.scrollY 

      if (lastScrollY > currrentScrollY){ 
        setScrollUp(true) ; 
      } else { 
        setScrollUp(false) ; 
      } 

      setLastScrollY(currrentScrollY)
    } ; 

    window.addEventListener("scroll",handleScroll); 

    return ()=> window.removeEventListener("scroll" , handleScroll)
  },[lastScrollY]);
  
  return scrollUp
}
