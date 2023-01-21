import React from 'react'

import { Box, useMediaQuery } from '@mui/material'
import { Navigate } from 'react-router-dom'

import NotificationsComponent from '~/components/Notifications'

const Notifications: React.FC = () => {
  const matches = useMediaQuery('(min-width:600px)')

  if (matches) {
    return <Navigate to='/' />
  }

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
      <NotificationsComponent show />
    </Box>
  )
}

export default Notifications
