import React, { useState, useEffect } from 'react'

import { CircularProgress } from '@mui/material'

import Switch from '~/components/Switch'
import { useAuth } from '~/providers/Auth'
import ProfileAPI from '~/services/ProfileAPI'
import { currentLanguage, setLanguage, translate } from '~/utils/Translate'
import { languages } from '~/utils/Translate/languages'

import { Button, EditProfileContainer, Input, ProfileItem } from './style'

const EditProfile: React.FC = () => {
  const { user, setUser } = useAuth()

  const [userName, setUserName] = useState<string>('')
  const [privateProfile, setPrivateProfile] = useState<boolean>(false)
  const [currentPassword, setCurrentPassword] = useState<string | undefined>()
  const [newPassword, setNewPassword] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUserName(user.profile.userName)
    setPrivateProfile(user.profile.privateProfile)
  }, [])

  const handleSaveProfile = async () => {
    setLoading(true)

    const response = await ProfileAPI.editProfile({
      userName,
      privateProfile,
      currentPassword,
      newPassword,
    })

    setUser(response)
    setLoading(false)
  }

  return (
    <EditProfileContainer>
      <ProfileItem>
        {translate('userName')}
        <Input
          onChange={(e) => setUserName(e.target.value)}
          style={{ textTransform: 'lowercase' }}
          defaultValue={userName || user.profile.userName}
        />
      </ProfileItem>
      <ProfileItem>
        {translate('currentPassword')}
        <Input
          type='password'
          onChange={(e) => setCurrentPassword(e.target.value)}
          defaultValue={currentPassword}
        />
      </ProfileItem>
      <ProfileItem>
        {translate('newPassword')}
        <Input
          type='password'
          onChange={(e) => setNewPassword(e.target.value)}
          defaultValue={newPassword}
        />
      </ProfileItem>
      <ProfileItem>
        {translate('privateProfile')}
        <Input
          type='checkbox'
          style={{ height: '20px' }}
          onChange={(e) => setPrivateProfile(e.target.checked)}
          defaultChecked={privateProfile || user.profile.privateProfile}
        />
      </ProfileItem>
      <Button type='button' disabled={loading} onClick={handleSaveProfile}>
        {!loading && translate('save')}
        {loading && <CircularProgress color='inherit' size={20} />}
      </Button>

      <ProfileItem>
        {translate('theme')}
        <Switch />
      </ProfileItem>

      <ProfileItem>
        {translate('language')}
        <select
          style={{ height: '30px' }}
          value={currentLanguage}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((language) => (
            <option value={language.name} key={language.name}>
              {translate(language.description)}
            </option>
          ))}
        </select>
      </ProfileItem>
    </EditProfileContainer>
  )
}

export default EditProfile
