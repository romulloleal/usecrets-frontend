import React, { useEffect, useState } from 'react'

import { VscLock } from 'react-icons/vsc'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'

import Posts from '~/components/Posts'
import { IPost, IProfile } from '~/interfaces'
import { FollowStatus } from '~/interfaces/IProfile'
import { useAuth } from '~/providers/Auth'
import PostAPI from '~/services/PostAPI'
import ProfileAPI from '~/services/ProfileAPI'
import { abbreviateNumber } from '~/utils/abbreviateNumber'
import { translate } from '~/utils/Translate'

import FollowContainer from './FollowContainer'
import ProfileHeader from './ProfileHeader'
import {
  PrivateProfileLayout,
  ProfileContainer,
  ProfilePostsLayout,
  ProfileStats,
  ProfileStatsItem,
  UserName,
} from './style'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const { userName } = useParams()

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<IProfile | undefined>()
  const [stats, setStats] = useState<{
    totalFollowing: number
    totalFollowers: number
    totalPosts: number
  }>({ totalFollowing: 0, totalFollowers: 0, totalPosts: 0 })
  const [followStatus, setFollowStatus] = useState<FollowStatus>(
    FollowStatus.NOT_FOLLOWING
  )

  const [posts, setPosts] = useState<IPost[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)

  useEffect(() => {
    getUserProfile()
  }, [userName, user])

  const getUserProfile = async () => {
    setLoading(true)
    setProfile(undefined)

    const response = await ProfileAPI.getUserProfile({
      userName,
      loggedUserId: user?.id,
    })
    const { totalFollowing, totalFollowers, totalPosts } = response

    setProfile(response.profile)
    setFollowStatus(response.followStatus)
    setStats({ totalFollowing, totalFollowers, totalPosts })

    setPosts(response.initialPosts.posts)
    setHasMore(response.initialPosts.hasMore)

    setLoading(false)
  }

  const loadPosts = async ({ skip }: { skip: number }) => {
    const response = await PostAPI.getProfilePosts({
      skip,
      userName: userName as string,
      loggedUserId: user?.id,
    })
    setPosts([...posts, ...response.posts])
    setHasMore(response.hasMore)
  }

  const deletePost = async (postId: string) => {
    const reloadPosts = posts.filter((post) => post.id !== postId)
    setPosts(reloadPosts)
    await PostAPI.deletePost({ postId })
  }

  return (
    <ProfileContainer>
      <ProfileHeader
        profile={profile}
        setProfile={setProfile}
        followStatus={followStatus}
      />

      <UserName>
        {loading ? <Skeleton width={200} /> : profile?.userName}
        {!loading && !profile?.userName && translate('userNotFound')}
      </UserName>

      {profile && (
        <ProfileStats>
          <ProfileStatsItem>
            {abbreviateNumber(stats.totalPosts)}
            <div className='title'>{translate('posts')}</div>
          </ProfileStatsItem>
          <ProfileStatsItem>
            {abbreviateNumber(stats.totalFollowers)}
            <div className='title'>{translate('followers')}</div>
          </ProfileStatsItem>
          <ProfileStatsItem>
            {abbreviateNumber(stats.totalFollowing)}
            <div className='title'>{translate('following')}</div>
          </ProfileStatsItem>
        </ProfileStats>
      )}

      {profile && (
        <FollowContainer
          privateProfile={profile.privateProfile}
          followStatus={followStatus}
          setFollowStatus={setFollowStatus}
          userName={profile.userName}
        />
      )}

      {profile?.privateProfile &&
      ['notFollowing', 'request'].includes(followStatus) ? (
        <PrivateProfileLayout>
          <VscLock />
          {translate('thisAccountIsPrivate')}
        </PrivateProfileLayout>
      ) : (
        <ProfilePostsLayout>
          <Posts
            posts={posts}
            hasMore={hasMore}
            loadPosts={loadPosts}
            loading={loading}
            deletePost={deletePost}
          />
        </ProfilePostsLayout>
      )}
    </ProfileContainer>
  )
}

export default Profile
