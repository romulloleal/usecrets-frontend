import React from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'

import SearchProfiles from '~/components/SearchProfiles'
import { useAuth } from '~/providers/Auth'
import { translate } from '~/utils/Translate'

import Menu from './Menu'
import {
  LogginButton,
  Header,
  HeaderContent,
  Logo,
  MainContainer,
} from './style'

const DefaultLayout: React.FC = ({ children }) => {
  const { user } = useAuth()

  return (
    <>
      <Header container className='header' sx={{ mb: 1 }}>
        <HeaderContent>
          <Link to='/'>
            <Logo />
          </Link>

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <SearchProfiles />
          </Box>

          <Menu />

          {!user && (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <LogginButton
                type='button'
                onClick={() => NiceModal.show('SignIn')}
              >
                {translate('signIn')}
              </LogginButton>
            </Box>
          )}
        </HeaderContent>
      </Header>

      <MainContainer>{children}</MainContainer>
    </>
  )
}

export default DefaultLayout
