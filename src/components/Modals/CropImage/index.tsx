import React, { useRef, useState } from 'react'

import NiceModal, { useModal, muiDialogV5 } from '@ebay/nice-modal-react'
import { Button, CircularProgress, Dialog } from '@mui/material'
import { GrClose } from 'react-icons/gr'
import { Cropper, CropperRef } from 'react-mobile-cropper'

import 'react-mobile-cropper/dist/style.css'
import { translate } from '~/utils/Translate'

import { CloseComponent } from './style'

const CropImage = NiceModal.create(
  ({
    base64Image,
    aspectRatio,
    callback,
  }: {
    base64Image: string
    aspectRatio?: number
    callback: (value: string) => Promise<void>
  }) => {
    const modal = useModal()

    const [loading, setLoading] = useState(false)

    const cropperRef = useRef<CropperRef>(null)

    const save = async () => {
      setLoading(true)
      try {
        await callback(cropperRef.current?.getCanvas()?.toDataURL() as string)
        setLoading(false)
        modal.hide()
      } catch {
        setLoading(false)
      }
    }

    return (
      <Dialog {...muiDialogV5(modal)} maxWidth='xl'>
        <CloseComponent onClick={modal.hide}>
          <GrClose className='closeIcon' />
        </CloseComponent>
        <Cropper
          stencilProps={{
            aspectRatio,
          }}
          src={base64Image}
          className='cropper'
          ref={cropperRef}
        />
        <Button variant='contained' onClick={save} disabled={loading}>
          {!loading && translate('save')}
          {loading && <CircularProgress color='inherit' size={20} />}
        </Button>
      </Dialog>
    )
  }
)

export default CropImage
