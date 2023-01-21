import { useState } from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaUser, FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { IPost } from '~/interfaces'
import { useAuth } from '~/providers/Auth'
import PostAPI from '~/services/PostAPI'
import { translate } from '~/utils/Translate'

import {
  PostContainer,
  PostImage,
  PostOptions,
  LikeCount,
  Header,
  ProfileImage,
  Author,
} from './style'

interface CardProps extends IPost {
  hidePostHeader?: boolean
}

const Post = ({
  id,
  text,
  image,
  author,
  liked,
  totalLikes: likes,
  hidePostHeader,
}: CardProps) => {
  const [isLiked, setIsLiked] = useState(liked)
  const [totalLikes, setTotalLikes] = useState(likes)
  const { user } = useAuth()

  const handleCreateUser = () => {
    NiceModal.show('SignUp')
  }

  const likeSecret = async () => {
    setIsLiked(true)
    setTotalLikes(totalLikes + 1)
    await PostAPI.likeUnLikePost({ postId: id })
  }

  const unLikeSecret = async () => {
    setIsLiked(false)
    setTotalLikes(totalLikes - 1)
    await PostAPI.likeUnLikePost({ postId: id })
  }

  const seeImg = () => {
    NiceModal.show('ImgModal', { image })
  }

  return (
    <PostContainer>
      {!hidePostHeader && (
        <Link to={`/profile/${author.userName}`}>
          <Header>
            <ProfileImage>
              {author.profileImage ? (
                <img
                  src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/profile/${author.profileImage}`}
                  alt={author.userName}
                />
              ) : (
                <FaUser />
              )}
            </ProfileImage>
            <Author>{author.userName}</Author>
          </Header>
        </Link>
      )}

      {text && (
        <CopyToClipboard
          text={text}
          onCopy={() => toast.success(translate('textCopy'))}
        >
          <div className='content-text'>{text}</div>
        </CopyToClipboard>
      )}

      {image && (
        <PostImage
          onClick={seeImg}
          src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/post/${image}`}
        />
      )}

      <PostOptions>
        {isLiked ? (
          <FaHeart
            onClick={!user ? handleCreateUser : unLikeSecret}
            color='#FF0000'
          />
        ) : (
          <FaRegHeart onClick={!user ? handleCreateUser : likeSecret} />
        )}
        <LikeCount>{totalLikes}</LikeCount>
      </PostOptions>
    </PostContainer>
  )
}

export default Post
