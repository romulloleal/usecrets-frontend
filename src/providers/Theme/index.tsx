import React, { createContext, useContext, useMemo, useState } from 'react'

import { ThemeProvider as MaterialTheme, DefaultTheme } from 'styled-components'

import { lightTheme, darkTheme } from './theme'

interface IThemeContext {
  changeTheme: () => void
  currentTheme: string | null
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

const ThemeProvider: React.FC = ({ children }) => {
  const currentTheme = localStorage.getItem('@uSecrets:theme')

  const [theme, setTheme] = useState<DefaultTheme>(() => {
    return currentTheme && currentTheme === 'dark' ? darkTheme : lightTheme
  })

  const changeTheme = () =>
    currentTheme && currentTheme === 'dark'
      ? (setTheme(lightTheme), localStorage.setItem('@uSecrets:theme', 'light'))
      : (setTheme(darkTheme), localStorage.setItem('@uSecrets:theme', 'dark'))

  const themeProvider = useMemo(
    () => ({ changeTheme, currentTheme }),
    [changeTheme, currentTheme]
  )

  return (
    <MaterialTheme theme={theme}>
      <ThemeContext.Provider value={themeProvider}>
        {children}
      </ThemeContext.Provider>
    </MaterialTheme>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  return context
}

export default ThemeProvider
