import { DefaultTheme } from 'styled-components'

import classicThemeLogo from '../../assets/classic/logo.png'
import darkThemeLogo from '../../assets/dark/logo.png'

export const lightTheme: DefaultTheme = {
  body: '#FAFAFA',
  text: '#181818',
  head: '#FAFAFA',
  cardColor: '#FFFFFF',
  cardTextColor: '#252525',
  logo: classicThemeLogo,
  inputBorder: 'rgba(0, 0, 0, 0.23)',
  arrowSelectColor: 'rgba(0, 0, 0, 0.54)',
  searchInput: '#efefef',
  boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
}
export const darkTheme: DefaultTheme = {
  body: '#181818',
  text: '#dddddd',
  head: '#181818',
  cardColor: '#252525',
  cardTextColor: '#DDDDDD',
  logo: darkThemeLogo,
  inputBorder: 'rgba(999, 999, 999, 0.50)',
  arrowSelectColor: 'rgba(999, 999, 999, 0.70)',
  searchInput: '#252525',
  boxShadow: '0 0 8px rgba(999, 999, 999, 0.2)',
}
