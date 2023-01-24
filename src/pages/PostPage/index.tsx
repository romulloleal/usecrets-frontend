import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import Post from '~/components/Posts/Post'
import { IPost } from '~/interfaces'
import { useAuth } from '~/providers/Auth'
import PostAPI from '~/services/PostAPI'

import { PagePostLayout } from './style'

const PostPage: React.FC = () => {
  const { user } = useAuth()
  const { postId } = useParams()

  const [post, setPost] = useState<IPost | undefined>()
  const [postNotFound, setPostNotFound] = useState(false)
  const [privatePost, setPrivatePost] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPost()
  }, [postId, user])

  const getPost = async () => {
    setLoading(true)
    const response = await PostAPI.getPost({
      postId: postId as string,
      loggedUserId: user.id,
    })

    setPost(response.post)
    setPostNotFound(response.postNotFound)
    setPrivatePost(response.privatePost)
    setLoading(false)
  }

  if (loading) {
    return <></>
  }

  return (
    <PagePostLayout>
      {post && !postNotFound && !privatePost && <Post {...post} />}
    </PagePostLayout>
  )
}

export default PostPage
