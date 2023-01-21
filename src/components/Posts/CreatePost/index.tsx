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

import { BoxStyle, TextFieldBottom } from './style'
import { CreatePostProps } from './types'

const CreatePost: React.FC<CreatePostProps> = ({ callback }) => {
  const [post, setPost] = useState('')
  const [base64Image, setBase64Image] = useState<string | undefined>()
  const [isPosting, setIsPosting] = useState(false)

  const { user } = useAuth()

  const checkTextLimit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value
    if (text.length <= 300) {
      setPost(text)
    }
  }

  const handleCreateUser = () => {
    NiceModal.show('SignUp')
  }

  const handlePost = async () => {
    setIsPosting(true)
    const response = await PostAPI.createPost({ text: post, base64Image })

    callback(response)
    setIsPosting(false)
    setPost('')
    setBase64Image(undefined)
    setIsPosting(false)
  }

  const onPaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    const element = event.clipboardData.files
    const fileElement = element[0]

    imageToBase64(fileElement, setBase64Image)
  }

  return (
    <BoxStyle sx={{ mb: 1 }}>
      <div className='textField'>
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
          value={post}
          placeholder={translate('tellSomething')}
        />

        {base64Image && (
          <div className='file'>
            <div
              className='close'
              aria-hidden
              onClick={() => setBase64Image(undefined)}
            >
              <GrClose className='closeIcon' />
            </div>
            <img src={base64Image} alt='' />
          </div>
        )}
      </div>

      <TextFieldBottom>
        <FileUpload
          uploadComponent={<FcAddImage size={40} />}
          // callback={setBase64Image}
          callback={() => console.log('aa')}
          cropImage
        />

        <Button
          disabled={!(post.length >= 1 || base64Image) || isPosting}
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
          progress={(post.length / 300) * 100}
          charsRemain={300 - post.length}
        />
      </TextFieldBottom>
    </BoxStyle>
  )
}

export default CreatePost
