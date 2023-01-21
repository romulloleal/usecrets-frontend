import { IProfile } from './IProfile'

export enum NotificationTypes {
  NEW_FOLLOW = 'newFollow',
  FOLLOW_REQUEST = 'followRequest',
  FOLLOW_ACCEPTED = 'followAccepted',
  POST_LIKED = 'postLiked',
}

export interface INotifications {
  id: string
  fromUser: IProfile
  notificationType: NotificationTypes
  newNotification: boolean
  followId: string
  likeId: string
}
