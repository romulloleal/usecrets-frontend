import { IAuthState, IUser } from '~/interfaces'
import { api } from '~/services/api'

import { getAccessToken } from '../getTokens'
import SocketIo from '../SocketIo'

const path = '/session'

const authenticate = async ({
  login,
  password,
}: {
  login: string
  password: string
}): Promise<IAuthState> => {
  const response = await api.post<IAuthState>(`${path}/authenticate`, {
    login,
    password,
  })

  SocketIo.joinRoom(response.data.user.profile.userName)

  return response.data
}

const getAuthenticatedUserProfile = async (): Promise<IUser> => {
  const response = await api.get<IUser>(
    `${path}/getAuthenticatedUserProfile`,
    await getAccessToken()
  )

  SocketIo.joinRoom(response.data.profile.userName)

  return response.data
}

const refreshAccessToken = async (): Promise<{
  accessToken: string
  refreshToken: string
}> => {
  const response = await api.post(`${path}/refreshAccessToken`, {
    refreshToken: localStorage.getItem('@uSecrets:refreshToken'),
  })

  return response.data
}

export default {
  authenticate,
  getAuthenticatedUserProfile,
  refreshAccessToken,
}
