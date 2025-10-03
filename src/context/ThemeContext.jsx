import React , {useContext , createContext, useState, useEffect} from 'react'

const ThemeContext = createContext() ; 

export const useTheme = () => useContext(ThemeContext) ; 

export const ThemeProvider = ({children}) =>{

  const [isDark,setIsDark] = useState(false) ; 

  useEffect(()=>{
    const bgPrimary = isDark ? "#FAF9F6" : "#000000" ; 
    const textPrimary = isDark ? "#000000" : "#ffffff" ; 
    const bgSecondary = isDark ?  "#FFFAFA" : "#111111" ;
    const bgButtons = isDark ? "#ffffff" : "#111111" ;
    const bgTertiary = isDark ? "#000000" : "#222222" ;
    const textTertiary = isDark ? "#FF0000" :"#FFFF00" ; 
    const bgButtons2 = isDark ? "#ffffff" : "#222222";

    document.documentElement.style.setProperty('--bg-primary',bgPrimary)
    document.documentElement.style.setProperty('--text-primary',textPrimary)
    document.documentElement.style.setProperty('--bg-secondary', bgSecondary)
    document.documentElement.style.setProperty('--bg-buttons', bgButtons)
    document.documentElement.style.setProperty('--bg-tertiary', bgTertiary)
    document.documentElement.style.setProperty('--text-tertiary',textTertiary)
    document.documentElement.style.setProperty('--bg-buttons2', bgButtons2);
    
  },[isDark])

  return (
    <ThemeContext.Provider value={{isDark,setIsDark}}>
      {children}
    </ThemeContext.Provider>
  )

}; 



export default ThemeContext