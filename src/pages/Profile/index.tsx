import React, { useEffect, useState } from 'react'

import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'

import { IProfile } from '~/interfaces'
import { useAuth } from '~/providers/Auth'
import ProfileAPI from '~/services/ProfileAPI'
import { abbreviateNumber } from '~/utils/abbreviateNumber'
import { translate } from '~/utils/Translate'

import FollowContainer from './FollowContainer'
import ProfileHeader from './ProfileHeader'
import ProfilePosts from './ProfilePosts'
import {
  ProfileContainer,
  ProfileStats,
  ProfileStatsItem,
  UserName,
} from './style'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const { userName } = useParams()

  const [loadingProfile, setLoadingProfile] = useState(true)
  const [profile, setProfile] = useState<IProfile | undefined>()
  const [stats, setStats] = useState<{
    totalFollowing: number
    totalFollowers: number
    totalPosts: number
  }>({ totalFollowing: 0, totalFollowers: 0, totalPosts: 0 })
  const [followStatus, setFollowStatus] = useState<
    'following' | 'request' | 'notFollowing' | 'userProfile'
  >('notFollowing')

  useEffect(() => {
    getUserProfile()
  }, [userName, user])

  const getUserProfile = async () => {
    setLoadingProfile(true)

    const response = await ProfileAPI.getUserProfile({
      userName,
      loggedUserId: user?.id,
    })
    const { totalFollowing, totalFollowers, totalPosts } = response

    setProfile(response.profile)
    setFollowStatus(response.followStatus)
    setStats({ totalFollowing, totalFollowers, totalPosts })
    setLoadingProfile(false)
  }

  return (
    <ProfileContainer>
      <ProfileHeader profile={profile} setProfile={setProfile} />

      <UserName>
        {loadingProfile ? <Skeleton width={200} /> : profile?.userName}
        {!loadingProfile && !profile?.userName && translate('userNotFound')}
      </UserName>

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

      {profile && (
        <FollowContainer
          followStatus={followStatus}
          setFollowStatus={setFollowStatus}
          userName={profile.userName}
        />
      )}

      <ProfilePosts
        userName={profile?.userName as string}
        privateProfile={profile?.privateProfile as boolean}
        followStatus={followStatus}
      />
    </ProfileContainer>
  )
}

export default Profile
