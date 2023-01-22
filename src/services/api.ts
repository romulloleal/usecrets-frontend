/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'

import { useAuth } from '~/providers/Auth'
import { translate } from '~/utils/Translate'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

let refreshingToken: any

const AxiosInterceptor = ({ children }: any) => {
  const { signOut, refreshAccessToken } = useAuth()

  useMemo(() => {
    api.interceptors.request.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (config: any) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    api.interceptors.response.use(
      async (response) => {
        const { message } = response.data
        if (message) {
          toast.success(translate(message))
        }
        return response
      },
      async (error) => {
        const originalConfig = error.config
        const { message } = error.response.data
        if (
          ![
            'userUnauthorized',
            'expiredAccessToken',
            'expiredRefreshToken',
          ].includes(message)
        ) {
          toast.error(translate(message))
        }

        // logout user
        if (
          message === 'userUnauthorized' ||
          message === 'expiredRefreshToken'
        ) {
          await signOut()
        }

        // create another token and refresh token
        if (
          error.response &&
          message === 'expiredAccessToken' &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true

          try {
            refreshingToken = refreshingToken || refreshAccessToken()
            const accessToken = await refreshingToken
            refreshingToken = null

            originalConfig.headers['Authorization'] = `Bearer ${accessToken}`
            return api(originalConfig)
          } catch (err) {
            return Promise.reject(err)
          }
        }
        return Promise.reject(error)
      }
    )
  }, [])
  return children
}

export default AxiosInterceptor
