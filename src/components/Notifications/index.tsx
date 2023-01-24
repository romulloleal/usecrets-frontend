import React, { useState, useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'

import { INotifications } from '~/interfaces'
import { NotificationTypes } from '~/interfaces/INotifications'
import FollowAPI from '~/services/FollowAPI'
import ProfileAPI from '~/services/ProfileAPI'
import { translate } from '~/utils/Translate'

import NotificationOption from './NotificationOption'
import { MarkAllAsRead, NotificationsContainer, Title } from './style'

const NotificationsComponent: React.FC<{
  show: boolean
  setShowNotifications?: (value: boolean) => void
}> = ({ show, setShowNotifications }) => {
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
    const updateNotifications = notifications.map((notification) => {
      if (notification.followId === followRequestId) {
        return {
          ...notification,
          type: NotificationTypes.NEW_FOLLOW,
          newNotification: false,
        }
      }
      return notification
    })

    setNotifications(updateNotifications)

    await FollowAPI.acceptRejectFollowerRequest({
      followRequestId,
      action: 'accept',
    })
  }

  const deleteFollowRequest = async (followRequestId: string) => {
    const updateNotifications = notifications.filter((notification) => {
      return notification.followId !== followRequestId
    })

    setNotifications(updateNotifications)

    await FollowAPI.acceptRejectFollowerRequest({
      followRequestId,
      action: 'reject',
    })
  }

  const handleNotifications = () => {
    setNotifications([])
    if (setShowNotifications) {
      setShowNotifications(false)
    }
  }

  const markAllAsread = async () => {
    handleNotifications()
    await ProfileAPI.markNotificationAsRead({ markAll: true })
  }

  if (!show) {
    return <></>
  }
  return (
    <NotificationsContainer id='notificationContainer'>
      <Title>
        {translate('notifications')}
        <MarkAllAsRead onClick={markAllAsread}>
          {translate('markAllAsRead')}
        </MarkAllAsRead>
      </Title>
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
          notifications.map((notification) =>
            notification.type === NotificationTypes.FOLLOW_REQUEST ? (
              <NotificationOption.FollowRequest
                key={notification.id}
                fromUser={notification.fromUser}
                followId={notification.followId}
                acceptFollowRequest={acceptFollowRequest}
                deleteFollowRequest={deleteFollowRequest}
              />
            ) : (
              <NotificationOption.OthersNotifications
                key={notification.id}
                notification={notification}
                notificationType={notification.type}
                closeNotifications={handleNotifications}
              />
            )
          )}
      </InfiniteScroll>
    </NotificationsContainer>
  )
}

export default NotificationsComponent
