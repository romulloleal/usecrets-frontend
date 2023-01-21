import { languages } from './languages'
import en_us from './languages/en_us.json'

const getCurrentLanguage = () => {
  const locale = localStorage.getItem('@uSecrets:language')
    ? localStorage.getItem('@uSecrets:language')
    : navigator.language

  const result = languages.find(
    (language: { name: string; file: unknown }) => language.name === locale
  )

  return result || { name: 'en-US', file: en_us }
}

export const translate = (value: string) => {
  const translations = getCurrentLanguage().file
  return translations[value as keyof typeof translations]
}

export const currentLanguage = getCurrentLanguage().name
export const setLanguage = (value: string) => {
  localStorage.setItem('@uSecrets:language', value)
  window.location.reload()
}
