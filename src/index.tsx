import React from 'react'

import NiceModal from '@ebay/nice-modal-react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Providers from './providers'

import 'react-loading-skeleton/dist/skeleton.css'

import '~/utils/modals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
  <Providers>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </Providers>
  // </React.StrictMode>
)
