// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string
    text: string
    head: string
    cardColor: string
    cardTextColor: string
    logo: string
    inputBorder: string
    arrowSelectColor: string
    searchInput: string
  }
}
