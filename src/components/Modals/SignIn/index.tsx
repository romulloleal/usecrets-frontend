import React, { useState } from 'react'

import NiceModal, { useModal, muiDialogV5 } from '@ebay/nice-modal-react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'

import { useAuth } from '~/providers/Auth'
import { translate } from '~/utils/Translate'

const SignIn = NiceModal.create(() => {
  const modal = useModal()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  const handleSignIn = async () => {
    await signIn(login, password)
    modal.hide()
  }
  return (
    <Dialog {...muiDialogV5(modal)}>
      <DialogTitle id='alert-dialog-slide-title'>
        {translate('welcomeToUsecrets')}
      </DialogTitle>
      <DialogContent>
        <Grid sx={{ mb: 1 }}>
          <Box>
            <TextField
              type='text'
              value={login}
              placeholder={translate('loginUser')}
              onChange={(e) => setLogin(e.target.value)}
              required
              size='small'
              inputProps={{
                autoCapitalize: 'none',
                style: { textTransform: 'lowercase' },
              }}
            />
          </Box>

          <Box>
            <TextField
              type='password'
              value={password}
              placeholder={translate('password')}
              onChange={(e) => setPassword(e.target.value)}
              required
              size='small'
              inputProps={{
                autoCapitalize: 'none',
              }}
            />
          </Box>
        </Grid>

        <Typography
          fontSize='0.75em'
          sx={{
            mt: 2,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
          color='#18A6F4'
          onClick={() => {
            modal.hide()
            NiceModal.show('SignUp')
          }}
        >
          {translate('dontHaveAcc')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={modal.hide} color='error'>
          {translate('close')}
        </Button>
        <Button
          disabled={!login || !password}
          onClick={handleSignIn}
          color='primary'
        >
          {translate('signIn')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default SignIn
