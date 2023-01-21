import { IPost } from '~/interfaces'

export interface CreatePostProps {
  callback: (response: IPost) => void
}
