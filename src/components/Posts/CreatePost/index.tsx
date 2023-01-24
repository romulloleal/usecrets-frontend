import React, { useState } from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { Button, CircularProgress } from '@mui/material'
import { FcAddImage } from 'react-icons/fc'
import { GrClose } from 'react-icons/gr'

import InputMention from '~/components/InputMention'
import ProgressCircle from '~/components/ProgressCircle'
import { useAuth } from '~/providers/Auth'
import PostAPI from '~/services/PostAPI'
import imageToBase64 from '~/utils/imageToBase64'
import { translate } from '~/utils/Translate'

import FileUpload from '../../FileUpload'

import {
  CreatePostLayout,
  TextContent,
  Options,
  PostFile,
  CloseButton,
} from './style'
import { CreatePostProps } from './types'

const CreatePost: React.FC<CreatePostProps> = ({ callback }) => {
  const [textPost, setTextPost] = useState('')
  const [base64Image, setBase64Image] = useState<string | undefined>()
  const [isPosting, setIsPosting] = useState(false)

  // for character count
  const [cleanText, setCleanText] = useState('')

  const { user } = useAuth()

  const checkTextLimit = (text: string) => {
    // replace loading state for empty
    text = text.replace(`{"id": "0", "userName": "loading"} `, '@')

    const tokenizedText = text
    // transform tokenized userName and id to normal string
    const searchMentions = text.match(/\{(.*?)\}/g)
    if (searchMentions) {
      const mentionProfiles = searchMentions.map((mention) => {
        const mentionParsed = JSON.parse(mention)
        text = text.replace(
          `"id": "${mentionParsed.id}", "userName": "${mentionParsed.userName}"`,
          mentionParsed.id
        )
        return {
          id: mentionParsed.id,
          userName: mentionParsed.userName,
        }
      })

      mentionProfiles.map((profile) => {
        text = text.replace(`{${profile.id}}`, profile.userName)
        return []
      })
    }
    if (text.length <= 300) {
      setCleanText(text)
      setTextPost(tokenizedText)
    }
  }

  const handleCreateUser = () => {
    NiceModal.show('SignUp')
  }

  const handlePost = async () => {
    setIsPosting(true)
    try {
      const response = await PostAPI.createPost({ text: textPost, base64Image })

      callback(response)
      setIsPosting(false)
      setTextPost('')
      setBase64Image(undefined)
      setIsPosting(false)
    } catch {
      setIsPosting(false)
    }
  }

  const onPaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    const element = event.clipboardData.files
    const fileElement = element[0]
    if (element.length >= 1) imageToBase64(fileElement, setBase64Image)
  }

  return (
    <CreatePostLayout sx={{ mb: 1 }}>
      <TextContent onPaste={onPaste}>
        <InputMention
          text={textPost}
          inputCallback={checkTextLimit}
          placeholder={translate('tellSomething')}
        />

        {base64Image && (
          <PostFile>
            <CloseButton
              className='close'
              aria-hidden
              onClick={() => setBase64Image(undefined)}
            >
              <GrClose className='closeIcon' />
            </CloseButton>
            <img src={base64Image} alt='' />
          </PostFile>
        )}
      </TextContent>

      <Options>
        <FileUpload
          uploadComponent={<FcAddImage size={40} />}
          callback={setBase64Image}
        />

        <Button
          disabled={!(textPost.length >= 1 || base64Image) || isPosting}
          type='submit'
          variant='contained'
          sx={{ mt: 1 }}
          onClick={!user ? handleCreateUser : handlePost}
        >
          {isPosting ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            translate('post')
          )}
        </Button>

        <ProgressCircle
          progress={(cleanText.length / 300) * 100}
          charsRemain={300 - cleanText.length}
        />
      </Options>
    </CreatePostLayout>
  )
}

export default CreatePost
