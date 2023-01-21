import React from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Modal } from '@mui/material'
import { GrClose } from 'react-icons/gr'

import { CloseComponent, ImgContainer } from './style'

const ImgModal = NiceModal.create<{ image: string }>(({ image }) => {
  const modal = useModal()

  return (
    <Modal
      open={modal.visible}
      onClose={modal.hide}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <>
        <CloseComponent onClick={modal.hide}>
          <GrClose className='closeIcon' />
        </CloseComponent>
        <ImgContainer>
          <img
            src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/post/${image}`}
            alt=''
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </ImgContainer>
      </>
    </Modal>
  )
})

export default ImgModal
