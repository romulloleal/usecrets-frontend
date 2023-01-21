import React, { useState, useMemo } from 'react'

import { VscLock } from 'react-icons/vsc'

import Posts from '~/components/Posts'
import { IPost } from '~/interfaces'
import { useAuth } from '~/providers/Auth'
import PostAPI from '~/services/PostAPI'
import { translate } from '~/utils/Translate'

import { PrivateProfileLayout, ProfilePostsLayout } from './style'

const ProfilePosts: React.FC<{
  privateProfile: boolean
  followStatus: string
  userName: string
}> = ({ privateProfile, followStatus, userName }) => {
  const { user } = useAuth()

  const [posts, setPosts] = useState<IPost[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const initialPosts = useMemo(async () => {
    setLoading(true)
    const response = await PostAPI.getProfilePosts({
      skip: 0,
      userName: userName as string,
      loggedUserId: user?.id,
    })
    setLoading(false)
    setPosts(response.posts)
    setHasMore(response.hasMore)

    return response.posts
  }, [userName, user])

  const loadPosts = async ({ skip }: { skip: number }) => {
    const response = await PostAPI.getProfilePosts({
      skip,
      userName: userName as string,
      loggedUserId: user?.id,
    })
    setPosts([...posts, ...response.posts])
    setHasMore(response.hasMore)
  }
  return (
    <>
      <ProfilePostsLayout>
        <Posts
          posts={posts || initialPosts}
          hasMore={hasMore}
          loadPosts={loadPosts}
          loading={loading}
          hidePostHeader
        />
      </ProfilePostsLayout>

      {privateProfile && ['notFollowing', 'request'].includes(followStatus) && (
        <PrivateProfileLayout>
          <VscLock />
          {translate('thisAccountIsPrivate')}
        </PrivateProfileLayout>
      )}
    </>
  )
}

export default ProfilePosts
