import React , {useContext , createContext, useState, useEffect} from 'react'

const ThemeContext = createContext() ; 

export const useTheme = () => useContext(ThemeContext) ; 

export const ThemeProvider = ({children}) =>{

  const [isDark,setIsDark] = useState(false) ; 

  useEffect(()=>{
    const bgPrimary = isDark ? "#ffffff" : "#000000" ; 
    const textPrimary = isDark ? "#000000" : "#ffffff" ; 
    const bgSecondary = isDark ?  "#ecf0f1" : "#111111" ;

    document.documentElement.style.setProperty('--bg-primary',bgPrimary)
    document.documentElement.style.setProperty('--text-primary',textPrimary)
    document.documentElement.style.setProperty('--bg-secondary', bgSecondary)
  },[isDark])

  return (
    <ThemeContext.Provider value={{isDark,setIsDark}}>
      {children}
    </ThemeContext.Provider>
  )

}; 



export default ThemeContext