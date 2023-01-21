import React, { useState, useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { FaUser } from 'react-icons/fa'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

import { INotifications } from '~/interfaces'
import { NotificationTypes } from '~/interfaces/INotifications'
import FollowAPI from '~/services/FollowAPI'
import ProfileAPI from '~/services/ProfileAPI'
import { translate } from '~/utils/Translate'

import {
  NotificationsContainer,
  NotificationsItem,
  Button,
  ProfileImage,
  Title,
  NotificationDescription,
} from './style'

const NotificationsComponent: React.FC<{ show: boolean }> = ({ show }) => {
  const [notifications, setNotifications] = useState<INotifications[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setNotifications([])
    if (show) loadNotifications({ skip: 0 })
  }, [show])

  const loadNotifications = async ({ skip }: { skip: number }) => {
    setLoading(true)
    const response = await ProfileAPI.getNotifications({
      skip,
    })

    setNotifications([...notifications, ...response.notifications])
    setHasMore(response.hasMore)
    setLoading(false)
  }

  const acceptFollowRequest = async (followRequestId: string) => {
    await FollowAPI.acceptRejectFollowerRequest({
      followRequestId,
      action: 'accept',
    })

    const updateNotifications = notifications.map((notification) => {
      if (notification.followId === followRequestId) {
        return {
          ...notification,
          notificationType: NotificationTypes.NEW_FOLLOW,
        }
      }
      return notification
    })

    setNotifications(updateNotifications)
  }

  const deleteFollowRequest = async (followRequestId: string) => {
    await FollowAPI.acceptRejectFollowerRequest({
      followRequestId,
      action: 'reject',
    })

    const updateNotifications = notifications.filter((notification) => {
      return notification.followId !== followRequestId
    })

    setNotifications(updateNotifications)
  }

  if (!show) {
    return <></>
  }
  return (
    <NotificationsContainer id='notificationContainer'>
      <Title>{translate('notifications')}</Title>
      {loading && <CircularProgress size={20} color='primary' />}
      <InfiniteScroll
        className='hide-scroll-bar'
        dataLength={notifications.length}
        next={() => loadNotifications({ skip: notifications.length })}
        hasMore={hasMore}
        loader={<CircularProgress size={20} color='primary' />}
        scrollableTarget='notificationContainer'
      >
        {notifications &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            <NotificationsItem key={notification.id}>
              <ProfileImage to={`/profile/${notification.fromUser.userName}`}>
                {notification.fromUser.profileImage ? (
                  <img
                    src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/profile/${notification.fromUser.profileImage}`}
                    width={40}
                    height={40}
                    alt={notification.fromUser.userName}
                  />
                ) : (
                  <FaUser />
                )}
              </ProfileImage>
              <NotificationDescription>
                <Link
                  to={`/profile/${notification.fromUser.userName}`}
                  className='fromUser'
                >
                  {notification.fromUser.userName}
                </Link>
                {notification.notificationType ===
                  NotificationTypes.FOLLOW_REQUEST && (
                  <>
                    <Button
                      type='button'
                      bgColor='#1565c0'
                      onClick={() => acceptFollowRequest(notification.followId)}
                    >
                      {translate('accept')}
                    </Button>
                    <Button
                      type='button'
                      bgColor='#333333'
                      onClick={() => deleteFollowRequest(notification.followId)}
                    >
                      {translate('delete')}
                    </Button>
                  </>
                )}
                {notification.notificationType ===
                  NotificationTypes.NEW_FOLLOW && translate('startsFollowYou')}
                {notification.notificationType ===
                  NotificationTypes.FOLLOW_ACCEPTED &&
                  translate('acceptsYourFollow')}
                {notification.notificationType ===
                  NotificationTypes.POST_LIKED && translate('likeYourPost')}
              </NotificationDescription>
              {/* {notification.newNotification && (
                <div className='newNotification' />
              )} */}
            </NotificationsItem>
          ))}
      </InfiniteScroll>
    </NotificationsContainer>
  )
}

export default NotificationsComponent
