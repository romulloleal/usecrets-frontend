import React, { createContext, useContext, useMemo, useState } from 'react'

import { IAuthState, IAuthContext, IUser } from '~/interfaces'
import { api } from '~/services/api'
import SessionAPI from '~/services/SessionAPI'

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<IAuthState>(() => {
    const user = localStorage.getItem('@uSecrets:user')
    const accessToken = localStorage.getItem('@uSecrets:accessToken')
    const refreshToken = localStorage.getItem('@uSecrets:refreshToken')

    if (user && accessToken && refreshToken) {
      return { user: JSON.parse(user), accessToken, refreshToken }
    }

    return {} as IAuthState
  })

  const signUp = async (userName: string, email: string, password: string) => {
    await api.post('/user/crateAccount', {
      userName,
      email,
      password,
    })

    await signIn(email, password)
  }

  const signIn = async (login: string, password: string) => {
    const response = await SessionAPI.authenticate({ login, password })
    const { user, accessToken, refreshToken } = response

    localStorage.setItem('@uSecrets:user', JSON.stringify(user))
    localStorage.setItem('@uSecrets:accessToken', accessToken)
    localStorage.setItem('@uSecrets:refreshToken', refreshToken)

    setData({ user, accessToken, refreshToken })
  }

  const signOut = async () => {
    localStorage.removeItem('@uSecrets:user')
    localStorage.removeItem('@uSecrets:accessToken')
    localStorage.removeItem('@uSecrets:refreshToken')

    setData({} as IAuthState)
  }

  const refreshAccessToken = async () => {
    const response = await SessionAPI.refreshAccessToken()
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response
    localStorage.setItem('@uSecrets:accessToken', newAccessToken)
    localStorage.setItem('@uSecrets:refreshToken', newRefreshToken)

    return newAccessToken
  }

  const setUser = async (user: IUser) => {
    setData({ ...data, user })
    localStorage.setItem('@uSecrets:user', JSON.stringify(user))
  }

  const authProvider = useMemo<IAuthContext>(
    () => ({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      signUp,
      signIn,
      signOut,
      refreshAccessToken,
      setUser,
    }),
    [
      data.user,
      data.accessToken,
      data.refreshToken,
      signUp,
      signIn,
      signOut,
      refreshAccessToken,
      setUser,
    ]
  )

  return (
    <AuthContext.Provider value={authProvider}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export default AuthProvider
