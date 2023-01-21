export interface IProfile {
  id: string
  userName: string
  profileImage: string
  coverImage: string
  privateProfile: boolean
}

export enum FollowStatus {
  REQUEST = 'request',
  FOLLOWING = 'following',
  NOT_FOLLOWING = 'notFollowing',
  USER_PROFILE = 'userProfile',
}
