import React, { useState } from 'react'

import { AiOutlinePicture } from 'react-icons/ai'
import { BsFillCameraFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { TfiTrash } from 'react-icons/tfi'

import FileUpload from '~/components/FileUpload'
import { IProfile } from '~/interfaces'
import { FollowStatus } from '~/interfaces/IProfile'
import ProfileAPI from '~/services/ProfileAPI'

import {
  ChangeCoverImage,
  ChangeImageOption,
  ChangeImageOptions,
  ChangeProfileImage,
  ProfileCover,
  ProfileImage,
} from './style'

const ProfileHeader: React.FC<{
  profile?: IProfile
  setProfile: (profile: IProfile) => void
  followStatus: FollowStatus
}> = ({ profile, setProfile, followStatus }) => {
  const [showCoverChangeImageOptions, setShowCoverChangeImageOptions] =
    useState(false)
  const [showProfileChangeImageOptions, setShowProfileChangeImageOptions] =
    useState(false)

  const handleCoverImageOptions = () => {
    setShowCoverChangeImageOptions(!showCoverChangeImageOptions)
    setShowProfileChangeImageOptions(false)
  }

  const handleProfileImageOptions = () => {
    setShowCoverChangeImageOptions(false)
    setShowProfileChangeImageOptions(!showProfileChangeImageOptions)
  }

  const updateCoverImage = async (base64Image: string) => {
    handleCoverImageOptions()
    const response = await ProfileAPI.updateCoverImage({ base64Image })
    const newProfile = {
      ...profile,
      coverImage: response.coverImage,
    }
    setProfile(newProfile as IProfile)
  }

  const updateProfileImage = async (base64Image: string) => {
    handleProfileImageOptions()
    const response = await ProfileAPI.updateProfileImage({ base64Image })
    const newProfile = {
      ...profile,
      profileImage: response.profileImage,
    }
    setProfile(newProfile as IProfile)
  }

  const deleteCoverImage = async () => {
    await ProfileAPI.deleteCoverImage()
    const newProfile = {
      ...profile,
      coverImage: '',
    }
    setProfile(newProfile as IProfile)
  }

  const deleteProfileImage = async () => {
    await ProfileAPI.deleteProfileImage()
    const newProfile = {
      ...profile,
      profileImage: '',
    }
    setProfile(newProfile as IProfile)
  }
  return (
    <ProfileCover
      coverImage={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/cover/${profile?.coverImage}`}
    >
      {followStatus === FollowStatus.USER_PROFILE && (
        <ChangeCoverImage>
          <BsFillCameraFill onClick={handleCoverImageOptions} />
          {showCoverChangeImageOptions && (
            <ChangeImageOptions>
              <FileUpload
                uploadComponent={
                  <ChangeImageOption>
                    <AiOutlinePicture />
                    Selecionar imagem
                  </ChangeImageOption>
                }
                aspectRatio={2 / 0.5}
                cropImage
                callback={updateCoverImage}
              />

              <ChangeImageOption onClick={deleteCoverImage}>
                <TfiTrash />
                Remover imagem
              </ChangeImageOption>
            </ChangeImageOptions>
          )}
        </ChangeCoverImage>
      )}
      <ProfileImage>
        {profile?.profileImage ? (
          <img
            src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/profile/${profile.profileImage}`}
            alt={profile.userName}
          />
        ) : (
          <FaUser className='defaultProfileImage' />
        )}
        {followStatus === FollowStatus.USER_PROFILE && (
          <ChangeProfileImage>
            <BsFillCameraFill onClick={handleProfileImageOptions} />
            {showProfileChangeImageOptions && (
              <ChangeImageOptions>
                <FileUpload
                  uploadComponent={
                    <ChangeImageOption>
                      <AiOutlinePicture />
                      Selecionar imagem
                    </ChangeImageOption>
                  }
                  aspectRatio={1 / 1}
                  cropImage
                  callback={updateProfileImage}
                />
                <ChangeImageOption onClick={deleteProfileImage}>
                  <TfiTrash />
                  Remover imagem
                </ChangeImageOption>
              </ChangeImageOptions>
            )}
          </ChangeProfileImage>
        )}
      </ProfileImage>
    </ProfileCover>
  )
}

export default ProfileHeader
