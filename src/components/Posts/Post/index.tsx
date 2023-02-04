import { useEffect, useRef, useState } from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { FaUser, FaRegHeart, FaHeart } from 'react-icons/fa'
import { RxDotsHorizontal } from 'react-icons/rx'

import { IPost } from '~/interfaces'
import { useAuth } from '~/providers/Auth'
import PostAPI from '~/services/PostAPI'
import { translate } from '~/utils/Translate'

import {
  PostContainer,
  PostImage,
  PostInteractions,
  LikeCount,
  Header,
  ProfileImage,
  Author,
  ContentText,
  HeaderLink,
  PostOptions,
  Options,
  OptionItem,
} from './style'
import TextTemplate from './TextTemplate'

interface CardProps extends IPost {
  hidePostHeader?: boolean
  deletePost?: (postId: string) => void
}

const Post = ({
  id,
  text,
  image,
  author,
  liked,
  totalLikes: likes,
  mentions,
  hidePostHeader,
  deletePost,
}: CardProps) => {
  const [isLiked, setIsLiked] = useState(liked)
  const [totalLikes, setTotalLikes] = useState(likes || 0)
  const [openPostOptions, setOpenPostOptions] = useState(false)
  const { user } = useAuth()

  const postOptionsRef = useRef<HTMLDivElement>(null)

  // used to close post options when clicked out
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        postOptionsRef.current &&
        !postOptionsRef.current.contains(event.target as Node)
      ) {
        setOpenPostOptions(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

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
        <Header>
          <HeaderLink to={`/profile/${author.userName}`}>
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
          </HeaderLink>

          <PostOptions ref={postOptionsRef}>
            <RxDotsHorizontal
              onClick={() => setOpenPostOptions(!openPostOptions)}
            />

            {openPostOptions && (
              <Options>
                {author.userId === user?.id && deletePost && (
                  <OptionItem onClick={() => deletePost(id)}>
                    {translate('delete')}
                  </OptionItem>
                )}
                {author.userId !== user?.id && (
                  <OptionItem>{translate('report')}</OptionItem>
                )}
              </Options>
            )}
          </PostOptions>
        </Header>
      )}

      <ContentText>
        {mentions && TextTemplate({ mentions, text })}
        {!mentions && text}
      </ContentText>

      {image && (
        <PostImage
          onClick={seeImg}
          src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/post/${image}`}
        />
      )}

      <PostInteractions>
        {isLiked ? (
          <FaHeart
            onClick={!user ? handleCreateUser : unLikeSecret}
            color='#FF0000'
          />
        ) : (
          <FaRegHeart onClick={!user ? handleCreateUser : likeSecret} />
        )}
        <LikeCount>{totalLikes}</LikeCount>
      </PostInteractions>
    </PostContainer>
  )
}

export default Post
