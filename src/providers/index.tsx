import React from 'react'

import { ToastContainer, Flip } from 'react-toastify'

import AxiosInterceptor from '~/services/api'

import AuthProvider from './Auth'
import ThemeProvider from './Theme'
import GlobalTheme from './Theme/global'

import 'react-toastify/dist/ReactToastify.css'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <GlobalTheme />
      <AuthProvider>
        <AxiosInterceptor>{children}</AxiosInterceptor>
      </AuthProvider>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
    </ThemeProvider>
  )
}

export default Providers
