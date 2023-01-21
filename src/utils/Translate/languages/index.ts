import brazilFlag from '~/assets/brazil.svg'
import usaFlag from '~/assets/USA.svg'

import en_us from './en_us.json'
import pt_br from './pt_br.json'

export const languages = [
  {
    flag: usaFlag,
    name: 'en-US',
    file: en_us,
    description: 'languageDescriptionEnUs',
  },
  {
    flag: brazilFlag,
    name: 'pt-BR',
    file: pt_br,
    description: 'languageDescriptionPtBr',
  },
]
