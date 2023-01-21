import React, { useState } from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

import { useAuth } from '~/providers/Auth'
import FollowAPI from '~/services/FollowAPI'
import { translate } from '~/utils/Translate'

import { ActionButton } from './style'

const FollowContainer: React.FC<{
  followStatus: 'following' | 'request' | 'notFollowing' | 'userProfile'
  setFollowStatus: (
    value: 'following' | 'request' | 'notFollowing' | 'userProfile'
  ) => void
  userName: string
}> = ({ followStatus, setFollowStatus, userName }) => {
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)

  const followUser = async () => {
    if (!user) {
      NiceModal.show('SignUp')
      return
    }
    setLoading(true)
    const response = await FollowAPI.followUser({ followedUserName: userName })
    setFollowStatus(response.status)
    setLoading(false)
  }

  const unfollowUser = async () => {
    if (!user) {
      NiceModal.show('SignUp')
      return
    }
    setLoading(true)
    await FollowAPI.unfollowUser({
      followedUserName: userName,
    })
    setFollowStatus('notFollowing')
    setLoading(false)
  }

  const cancelFollowRequest = async () => {
    if (!user) {
      NiceModal.show('SignUp')
      return
    }
    setLoading(true)
    await FollowAPI.cancelFollowRequest({ followedUserName: userName })
    setFollowStatus('notFollowing')
    setLoading(false)
  }

  return (
    <>
      {followStatus === 'notFollowing' && (
        <ActionButton bgColor='#1565c0' onClick={followUser}>
          {loading && <CircularProgress color='inherit' size={20} />}
          {!loading && translate('follow')}
        </ActionButton>
      )}
      {followStatus === 'following' && (
        <ActionButton onClick={unfollowUser}>
          {loading && <CircularProgress color='inherit' size={20} />}
          {!loading && translate('unfollow')}
        </ActionButton>
      )}
      {followStatus === 'request' && (
        <ActionButton onClick={cancelFollowRequest}>
          {loading && <CircularProgress color='inherit' size={20} />}
          {!loading && translate('cancelRequest')}
        </ActionButton>
      )}
      {followStatus === 'userProfile' && (
        <Link to='/editProfile'>
          {loading && <CircularProgress color='inherit' size={20} />}
          <ActionButton>{translate('editProfile')}</ActionButton>
        </Link>
      )}
    </>
  )
}

export default FollowContainer
