import { Imention } from './IMention'
import { IProfile } from './IProfile'

export interface IPost {
  id: string
  text: string
  image?: string
  author: IProfile
  totalLikes: number
  liked: boolean
  createdAt: string
  mentions?: Imention[]
}
