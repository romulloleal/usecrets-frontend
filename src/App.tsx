import React, { useEffect } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { useAuth } from './providers/Auth'
import Routes from './routes'
import ScrollToTop from './routes/ScrollTop'
import SessionAPI from './services/SessionAPI'
import SocketIo from './services/SocketIo'

const App = () => {
  const { user, setUser } = useAuth()

  useEffect(() => {
    SocketIo.socketConnect()
    if (user) {
      getAuthenticatedUser()
    }
  }, [])

  // get user data when access system for sync data
  const getAuthenticatedUser = async () => {
    const response = await SessionAPI.getAuthenticatedUserProfile()

    setUser(response)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes />
    </BrowserRouter>
  )
}

export default App
