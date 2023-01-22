import React, { useState } from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { Button, CircularProgress, TextField } from '@mui/material'
import { FcAddImage } from 'react-icons/fc'
import { GrClose } from 'react-icons/gr'

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

  const { user } = useAuth()

  // const checkTextLimit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  const checkTextLimit = (event: { target: { value: string } }) => {
    const text = event.target.value
    if (text.length <= 300) {
      setTextPost(text)
    }
  }

  const handleCreateUser = () => {
    NiceModal.show('SignUp')
  }

  const handlePost = async () => {
    setIsPosting(true)
    const response = await PostAPI.createPost({ text: textPost, base64Image })

    callback(response)
    setIsPosting(false)
    setTextPost('')
    setBase64Image(undefined)
    setIsPosting(false)
  }

  const onPaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    const element = event.clipboardData.files
    const fileElement = element[0]
    if (element.length >= 1) imageToBase64(fileElement, setBase64Image)
  }

  return (
    <CreatePostLayout sx={{ mb: 1 }}>
      <TextContent>
        <TextField
          onChange={checkTextLimit}
          variant='standard'
          InputProps={{
            disableUnderline: true,
          }}
          onPaste={onPaste}
          fullWidth
          multiline
          minRows={3}
          value={textPost}
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
          progress={(textPost.length / 300) * 100}
          charsRemain={300 - textPost.length}
        />
      </Options>
    </CreatePostLayout>
  )
}

export default CreatePost
