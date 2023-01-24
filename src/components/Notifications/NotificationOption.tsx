import React from 'react'

import { FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import { IProfile } from '~/interfaces'
import { INotifications, NotificationTypes } from '~/interfaces/INotifications'
import ProfileAPI from '~/services/ProfileAPI'
import { translate } from '~/utils/Translate'

import {
  Button,
  NotificationDescription,
  NotificationsItem,
  ProfileImage,
} from './style'

const ProfileImageComponent = ({
  userName,
  profileImage,
}: {
  userName: string
  profileImage: string
}) => {
  return (
    <ProfileImage to={`/profile/${userName}`}>
      {profileImage ? (
        <img
          src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/profile/${profileImage}`}
          width={40}
          height={40}
          alt={userName}
        />
      ) : (
        <FaUser />
      )}
    </ProfileImage>
  )
}

const FromUserName = ({ userName }: { userName: string }) => {
  return (
    <Link to={`/profile/${userName}`} className='fromUser'>
      {userName}
    </Link>
  )
}

const FollowRequest = ({
  fromUser,
  followId,
  acceptFollowRequest,
  deleteFollowRequest,
}: {
  fromUser: IProfile
  followId: string
  acceptFollowRequest: (followId: string) => void
  deleteFollowRequest: (followId: string) => void
}) => {
  return (
    <NotificationsItem>
      <ProfileImageComponent
        profileImage={fromUser.profileImage}
        userName={fromUser.userName}
      />
      <NotificationDescription>
        <FromUserName userName={fromUser.userName} />
        <Button
          type='button'
          bgColor='#1565c0'
          onClick={() => acceptFollowRequest(followId)}
        >
          {translate('accept')}
        </Button>
        <Button
          type='button'
          bgColor='#333333'
          onClick={() => deleteFollowRequest(followId)}
        >
          {translate('delete')}
        </Button>
      </NotificationDescription>
    </NotificationsItem>
  )
}

const OthersNotifications = ({
  notification,
  notificationType,
  closeNotifications,
}: {
  notification: INotifications
  notificationType: NotificationTypes
  closeNotifications: () => void
}) => {
  const navigate = useNavigate()

  const navigateTo = async () => {
    closeNotifications()
    if (
      [
        NotificationTypes.NEW_FOLLOW,
        NotificationTypes.FOLLOW_ACCEPTED,
      ].includes(notificationType)
    ) {
      navigate(`/profile/${notification.fromUser.userName}`)
    }
    if (
      [NotificationTypes.POST_LIKED, NotificationTypes.POST_MENTION].includes(
        notificationType
      )
    ) {
      navigate(`/post/${notification.postId}`)
    }

    if (notification.newNotification) {
      await ProfileAPI.markNotificationAsRead({
        notificationId: notification.id,
      })
    }
  }
  return (
    <NotificationsItem onClick={navigateTo}>
      <ProfileImageComponent
        profileImage={notification.fromUser.profileImage}
        userName={notification.fromUser.userName}
      />
      <NotificationDescription>
        <FromUserName userName={notification.fromUser.userName} />
        {notification.type === NotificationTypes.NEW_FOLLOW &&
          translate('startsFollowYou')}
        {notification.type === NotificationTypes.FOLLOW_ACCEPTED &&
          translate('acceptsYourFollow')}
        {notification.type === NotificationTypes.POST_LIKED &&
          translate('likeYourPost')}
        {notification.type === NotificationTypes.POST_MENTION &&
          translate('mentionYouOnAPost')}
        {notification.newNotification && <div className='newNotification' />}
      </NotificationDescription>
    </NotificationsItem>
  )
}

export default {
  OthersNotifications,
  FollowRequest,
}
