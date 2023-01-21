import { IAuthState } from './IAuthState'
import { IUser } from './IUser'

export interface IAuthContext extends IAuthState {
  signUp: (userName: string, email: string, password: string) => Promise<void>
  signIn: (login: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshAccessToken: () => Promise<string>
  setUser: (user: IUser) => Promise<void>
}
