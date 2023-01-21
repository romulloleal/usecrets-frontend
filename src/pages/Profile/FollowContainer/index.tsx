import React from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { Link } from 'react-router-dom'

import { FollowStatus } from '~/interfaces/IProfile'
import { useAuth } from '~/providers/Auth'
import FollowAPI from '~/services/FollowAPI'
import { translate } from '~/utils/Translate'

import { ActionButton } from './style'

const FollowContainer: React.FC<{
  followStatus: FollowStatus
  setFollowStatus: (value: FollowStatus) => void
  userName: string
  privateProfile: boolean
}> = ({ followStatus, setFollowStatus, userName, privateProfile }) => {
  const { user } = useAuth()

  const followUser = async () => {
    await checkHasUser()

    setFollowStatus(
      privateProfile ? FollowStatus.REQUEST : FollowStatus.FOLLOWING
    )
    await FollowAPI.followUser({ followedUserName: userName })
  }

  const unfollowUser = async () => {
    await checkHasUser()

    setFollowStatus(FollowStatus.NOT_FOLLOWING)
    await FollowAPI.unfollowUser({
      followedUserName: userName,
    })
  }

  const cancelFollowRequest = async () => {
    await checkHasUser()

    setFollowStatus(FollowStatus.NOT_FOLLOWING)
    await FollowAPI.cancelFollowRequest({ followedUserName: userName })
  }

  const checkHasUser = async () => {
    if (!user) {
      NiceModal.show('SignUp')
      return true
    }

    return false
  }

  return (
    <>
      {followStatus === FollowStatus.NOT_FOLLOWING && (
        <ActionButton bgColor='#1565c0' onClick={followUser}>
          {translate('follow')}
        </ActionButton>
      )}
      {followStatus === FollowStatus.FOLLOWING && (
        <ActionButton onClick={unfollowUser}>
          {translate('unfollow')}
        </ActionButton>
      )}
      {followStatus === FollowStatus.REQUEST && (
        <ActionButton onClick={cancelFollowRequest}>
          {translate('cancelRequest')}
        </ActionButton>
      )}
      {followStatus === FollowStatus.USER_PROFILE && (
        <Link to='/editProfile'>
          <ActionButton>{translate('editProfile')}</ActionButton>
        </Link>
      )}
    </>
  )
}

export default FollowContainer
