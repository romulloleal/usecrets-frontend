import { useLayoutEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import StackGrid from 'react-stack-grid'

import { IPost } from '~/interfaces'

import Post from './Post'

const Posts = ({
  posts,
  hasMore,
  loading,
  loadPosts,
  hidePostHeader,
}: {
  posts: IPost[]
  hasMore: boolean
  loading: boolean
  loadPosts: ({ skip }: { skip: number }) => Promise<void>
  hidePostHeader?: boolean
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', updateSize)
    updateSize()
  }, [])

  if (loading) {
    return (
      <StackGrid
        monitorImagesLoaded
        columnWidth={windowWidth <= 600 ? '100%' : 220}
      >
        {Array(20)
          .fill(1)
          .map((i, index) => (
            <Skeleton
              width='100%'
              key={index as number}
              height={Math.random() * (400 - 100) + 100}
            />
          ))}
      </StackGrid>
    )
  }

  return (
    <InfiniteScroll
      style={{ paddingBottom: 10, paddingTop: 10 }}
      className='hide-scroll-bar'
      dataLength={posts.length}
      next={() => loadPosts({ skip: posts.length })}
      hasMore={hasMore}
      loader={<></>}
    >
      <StackGrid
        monitorImagesLoaded
        columnWidth={windowWidth <= 600 ? '100%' : 220}
      >
        {posts.map((post) => (
          <Post key={post.id} {...post} hidePostHeader={hidePostHeader} />
        ))}
      </StackGrid>
    </InfiniteScroll>
  )
}

export default Posts
