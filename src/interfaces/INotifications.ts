import { IProfile } from './IProfile'

export enum NotificationTypes {
  NEW_FOLLOW = 'newFollow',
  FOLLOW_REQUEST = 'followRequest',
  FOLLOW_ACCEPTED = 'followAccepted',
  POST_LIKED = 'postLiked',
  POST_MENTION = 'postMention',
}

export interface INotifications {
  id: string
  fromUser: IProfile
  type: NotificationTypes
  newNotification: boolean
  followId: string
  likeId: string
  postId: string
}
