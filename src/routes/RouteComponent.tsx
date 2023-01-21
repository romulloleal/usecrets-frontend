import React from 'react'

import { Navigate } from 'react-router-dom'

import DefaultLayout from '~/layouts/DefaultLayout'
import { useAuth } from '~/providers/Auth'

interface RouteParams {
  isPrivate?: boolean
  redirectWhenLogged?: boolean
  permissions?: string[]
  component: React.FC<{ permissions?: string[] }>
}

const RouteComponent: React.FC<RouteParams> = ({
  isPrivate,
  redirectWhenLogged,
  permissions,
  component: Component,
}) => {
  const { user } = useAuth()

  if (redirectWhenLogged && user) return <Navigate to='/' />

  if (isPrivate && !user) return <Navigate to='/' />

  const Layout = DefaultLayout

  return (
    <Layout>
      <Component permissions={permissions} />
    </Layout>
  )
}

export default RouteComponent
