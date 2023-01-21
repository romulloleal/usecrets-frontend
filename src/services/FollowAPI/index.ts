import { api } from '~/services/api'

import { getAccessToken } from '../getTokens'

const path = '/follow'

const followUser = async ({
  followedUserName,
}: {
  followedUserName: string
}): Promise<{ status: 'following' | 'request' | 'notFollowing' }> => {
  const response = await api.post(
    `${path}/followUser`,
    {
      followedUserName,
    },
    await getAccessToken()
  )

  return response.data
}

const unfollowUser = async ({
  followedUserName,
}: {
  followedUserName: string
}): Promise<void> => {
  await api.post(
    `${path}/unfollowUser`,
    {
      followedUserName,
    },
    await getAccessToken()
  )
}

const acceptRejectFollowerRequest = async ({
  followRequestId,
  action,
}: {
  followRequestId: string
  action: 'accept' | 'reject'
}): Promise<void> => {
  await api.post(
    `${path}/acceptRejectFollowerRequest`,
    {
      followRequestId,
      action,
    },
    await getAccessToken()
  )
}

const cancelFollowRequest = async ({
  followedUserName,
}: {
  followedUserName: string
}): Promise<void> => {
  await api.post(
    `${path}/cancelFollowRequest`,
    {
      followedUserName,
    },
    await getAccessToken()
  )
}

const removeFollower = async ({
  followerUserName,
}: {
  followerUserName: string
}): Promise<void> => {
  await api.post(
    `${path}/removeFollower`,
    {
      followerUserName,
    },
    await getAccessToken()
  )
}

export default {
  followUser,
  unfollowUser,
  acceptRejectFollowerRequest,
  cancelFollowRequest,
  removeFollower,
}
