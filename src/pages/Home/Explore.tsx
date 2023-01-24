import React, { useEffect, useState } from 'react'

import Posts from '~/components/Posts'
import CreatePost from '~/components/Posts/CreatePost'
import { IPost } from '~/interfaces'
import { useAuth } from '~/providers/Auth'
import PostAPI from '~/services/PostAPI'

const Explore: React.FC = () => {
  const { user } = useAuth()

  const [posts, setPosts] = useState<IPost[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    loadPosts({ skip: 0 })
  }, [])

  const loadPosts = async ({ skip }: { skip: number }) => {
    const response = await PostAPI.explore({ skip, loggedUserId: user?.id })

    setLoading(false)
    setPosts([...posts, ...response.posts])
    setHasMore(response.hasMore)
  }

  const createPost = async (newPost: IPost) => {
    setPosts([newPost, ...posts])
  }

  const deletePost = async (postId: string) => {
    const reloadPosts = posts.filter((post) => post.id !== postId)
    setPosts(reloadPosts)
    await PostAPI.deletePost({ postId })
  }

  return (
    <>
      <CreatePost callback={createPost} />
      <Posts
        posts={posts}
        hasMore={hasMore}
        loadPosts={loadPosts}
        loading={loading}
        deletePost={deletePost}
      />
    </>
  )
}

export default Explore
