import { INotifications, IPost, IProfile, IUser } from '~/interfaces'
import { FollowStatus } from '~/interfaces/IProfile'
import { api } from '~/services/api'

import { getAccessToken } from '../getTokens'

const path = '/profile'

const editProfile = async ({
  userName,
  privateProfile,
  currentPassword,
  newPassword,
}: {
  userName: string
  privateProfile: boolean
  currentPassword?: string
  newPassword?: string
}): Promise<IUser> => {
  const response = await api.post(
    `${path}/editProfile`,
    { userName, privateProfile, currentPassword, newPassword },
    await getAccessToken()
  )

  return response.data
}

const getUserProfile = async ({
  loggedUserId,
  userName,
}: {
  loggedUserId?: string
  userName?: string
}): Promise<{
  profile: IProfile | undefined
  totalFollowing: number
  totalFollowers: number
  totalPosts: number
  followStatus: FollowStatus
  initialPosts: {
    posts: IPost[]
    hasMore: boolean
  }
}> => {
  const response = await api.post(`${path}/getUserProfile`, {
    loggedUserId,
    userName,
  })

  return response.data
}

const searchProfiles = async ({
  search,
}: {
  search: string
}): Promise<IProfile[]> => {
  const response = await api.post(`${path}/searchProfiles`, {
    search,
  })

  return response.data
}

const updateCoverImage = async ({
  base64Image,
}: {
  base64Image: string
}): Promise<{ coverImage: string }> => {
  const formData = new FormData()
  const blobImage = await fetch(base64Image).then((res) => res.blob())
  formData.append('image', blobImage)
  const response = await api.post(
    `${path}/updateCoverImage`,
    formData,
    await getAccessToken()
  )

  return response.data
}

const updateProfileImage = async ({
  base64Image,
}: {
  base64Image: string
}): Promise<{ profileImage: string }> => {
  const formData = new FormData()
  const blobImage = await fetch(base64Image).then((res) => res.blob())
  formData.append('image', blobImage)
  const response = await api.post(
    `${path}/updateProfileImage`,
    formData,
    await getAccessToken()
  )

  return response.data
}

const deleteProfileImage = async (): Promise<void> => {
  await api.post(`${path}/deleteProfileImage`, await getAccessToken())
}

const deleteCoverImage = async (): Promise<void> => {
  await api.post(`${path}/deleteCoverImage`, await getAccessToken())
}

const getNotifications = async ({
  skip,
}: {
  skip: number
}): Promise<{ notifications: INotifications[]; hasMore: boolean }> => {
  const response = await api.post(
    `${path}/getNotifications`,
    {
      skip,
    },
    await getAccessToken()
  )

  return response.data
}

export default {
  editProfile,
  getUserProfile,
  searchProfiles,
  updateCoverImage,
  updateProfileImage,
  deleteProfileImage,
  deleteCoverImage,
  getNotifications,
}
