import { IUser } from './IUser'

export interface IAuthState {
  user: IUser
  accessToken: string
  refreshToken: string
}
