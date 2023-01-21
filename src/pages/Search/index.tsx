import React from 'react'

import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Navigate } from 'react-router-dom'

import SearchProfiles from '~/components/SearchProfiles'

const Search: React.FC = () => {
  const matches = useMediaQuery('(min-width:600px)')

  if (matches) {
    return <Navigate to='/' />
  }
  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
      <SearchProfiles />
    </Box>
  )
}

export default Search
