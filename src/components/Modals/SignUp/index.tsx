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

const SignUp = NiceModal.create(() => {
  const modal = useModal()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signUp } = useAuth()

  const handleCreateAccount = async () => {
    await signUp(userName, email, password)
    modal.hide()
  }

  return (
    <Dialog {...muiDialogV5(modal)}>
      <DialogTitle id='alert-dialog-slide-title'>
        {translate('welcomeToUsecrets')}
      </DialogTitle>
      <DialogContent>
        <Typography>{translate('welcomeDescription')}</Typography>

        <Grid sx={{ mb: 1 }}>
          <Box>
            <TextField
              type='text'
              value={userName}
              placeholder={translate('userName')}
              onChange={(e) => setUserName(e.target.value)}
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
              type='email'
              value={email}
              placeholder={translate('email')}
              onChange={(e) => setEmail(e.target.value)}
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

        <Typography fontSize='0.75em'>
          {translate('welcomeAgreeTerms')}
        </Typography>

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
            NiceModal.show('SignIn')
          }}
        >
          {translate('alreadyHaveAcc')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={modal.hide} color='error'>
          {translate('close')}
        </Button>
        <Button
          disabled={!userName || !email || !password}
          onClick={handleCreateAccount}
          color='primary'
        >
          {translate('signUp')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default SignUp
