import React, { useRef } from 'react'

import NiceModal from '@ebay/nice-modal-react'

import imageToBase64 from '~/utils/imageToBase64'

import { FileUploadProps } from './types'

const FileUpload: React.FC<FileUploadProps> = ({
  uploadComponent,
  aspectRatio,
  callback,
  cropImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onFileChange = async () => {
    const file = inputRef.current?.files
    if (file) {
      if (cropImage) {
        imageToBase64(file[0], openImageCroper)
      } else {
        imageToBase64(file[0], callback)
      }
      inputRef.current.value = ''
    }
  }

  const openImageCroper = async (base64Image: string) => {
    NiceModal.show('CropImage', {
      base64Image,
      aspectRatio,
      callback,
    })
  }

  const handleInput = () => {
    inputRef.current?.click()
  }

  return (
    <>
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={handleInput}
        aria-hidden
      >
        {uploadComponent}
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type='file'
          accept='image/*'
          onChange={onFileChange}
        />
      </div>
    </>
  )
}

export default FileUpload
