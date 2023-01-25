import React, { useEffect, useState } from 'react'

import { FaUser } from 'react-icons/fa'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'

import Post from '~/components/Posts/Post'
import { IPost, IProfile } from '~/interfaces'
import { useAuth } from '~/providers/Auth'
import PostAPI from '~/services/PostAPI'
import { translate } from '~/utils/Translate'

import {
  PagePostLayout,
  PostNotFoundOrPrivateComponent,
  ProfileImage,
  VisitProfile,
} from './style'

const PostPage: React.FC = () => {
  const { user } = useAuth()
  const { postId } = useParams()

  const [post, setPost] = useState<IPost | undefined>()
  const [author, setAuthor] = useState<IProfile | undefined>()
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
      loggedUserId: user?.id,
    })

    setPost(response.post)
    setAuthor(response.author)
    setPostNotFound(response.postNotFound)
    setPrivatePost(response.privatePost)
    setLoading(false)
  }

  if (loading) {
    return <></>
  }

  return (
    <PagePostLayout>
      {postNotFound && (
        <PostNotFoundOrPrivateComponent>
          <MdOutlineErrorOutline />
          {translate('opsPostNotFound')}
        </PostNotFoundOrPrivateComponent>
      )}
      {privatePost && author && (
        <PostNotFoundOrPrivateComponent>
          <ProfileImage>
            {author.profileImage ? (
              <img
                src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/profile/${author.profileImage}`}
                alt={author.userName}
              />
            ) : (
              <FaUser className='defaultProfileImage' />
            )}
          </ProfileImage>
          <span className='userName'>@{author.userName}</span>
          <VisitProfile to={`/profile/${author.userName}`}>
            {translate('visitProfile')}
          </VisitProfile>
          {translate('postFromPrivateAcc')}
        </PostNotFoundOrPrivateComponent>
      )}
      {post && author && !postNotFound && !privatePost && (
        <Post {...post} author={author} />
      )}
    </PagePostLayout>
  )
}

export default PostPage
