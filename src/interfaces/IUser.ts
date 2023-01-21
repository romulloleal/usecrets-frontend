import { IProfile } from './IProfile'

export interface IUser {
  id: string
  email: string
  profile: IProfile
  totalNotificatons: number
}
