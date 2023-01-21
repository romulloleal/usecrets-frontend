import NiceModal from '@ebay/nice-modal-react'
import ReactDOM from 'react-dom'

import App from './App'
import Providers from './providers'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import 'react-loading-skeleton/dist/skeleton.css'

import '~/utils/modals'

ReactDOM.render(
  <Providers>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </Providers>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
