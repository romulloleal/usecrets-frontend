import { IPost } from '~/interfaces'
import { api } from '~/services/api'

import { getAccessToken } from '../getTokens'

const path = '/post'

const createPost = async ({
  text,
  base64Image,
}: {
  text: string
  base64Image?: string
}): Promise<IPost> => {
  const formData = new FormData()
  formData.append('text', text)

  if (base64Image) {
    const blobImage = await fetch(base64Image).then((res) => res.blob())
    formData.append('image', blobImage)
  }

  const response = await api.post(
    `${path}/createPost`,
    formData,
    await getAccessToken()
  )

  return response.data
}

const getPostsFromFollowedProfiles = async ({
  skip,
}: {
  skip: number
}): Promise<{ posts: IPost[]; hasMore: boolean }> => {
  const response = await api.post(
    `${path}/getPostsFromFollowedProfiles`,
    {
      skip,
    },
    await getAccessToken()
  )

  return response.data
}

const explore = async ({
  skip,
  loggedUserId,
}: {
  skip: number
  loggedUserId?: string
}): Promise<{ posts: IPost[]; hasMore: boolean }> => {
  const response = await api.post(`${path}/explore`, {
    skip,
    loggedUserId,
  })

  return response.data
}

const getProfilePosts = async ({
  skip,
  userName,
  loggedUserId,
}: {
  skip: number
  userName: string
  loggedUserId?: string
}): Promise<{ posts: IPost[]; hasMore: boolean }> => {
  const response = await api.post(`${path}/getProfilePosts`, {
    skip,
    userName,
    loggedUserId,
  })

  return response.data
}

const likeUnLikePost = async ({
  postId,
}: {
  postId: string
}): Promise<void> => {
  await api.post(
    `${path}/likeUnLikePost`,
    {
      postId,
    },
    await getAccessToken()
  )
}

export default {
  createPost,
  getPostsFromFollowedProfiles,
  explore,
  getProfilePosts,
  likeUnLikePost,
}
