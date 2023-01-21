import React, { useEffect, useState } from 'react'

import { RiEmotionSadLine } from 'react-icons/ri'

import Posts from '~/components/Posts'
import { IPost } from '~/interfaces'
import PostAPI from '~/services/PostAPI'
import { translate } from '~/utils/Translate'

import { NoPostsMessage } from './style'

const Following: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    loadPosts({ skip: 0 })
  }, [])

  const loadPosts = async ({ skip }: { skip: number }) => {
    const response = await PostAPI.getPostsFromFollowedProfiles({ skip })

    setLoading(false)
    setPosts([...posts, ...response.posts])
    setHasMore(response.hasMore)
  }

  return (
    <>
      {!loading && posts && posts.length <= 0 && (
        <NoPostsMessage>
          <RiEmotionSadLine />
          {translate('oopsNoPosts')}
        </NoPostsMessage>
      )}
      <Posts
        posts={posts}
        hasMore={hasMore}
        loadPosts={loadPosts}
        loading={loading}
      />
    </>
  )
}

export default Following
