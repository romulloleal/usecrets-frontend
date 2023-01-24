import React, { useState, useCallback, useMemo } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { debounce } from 'lodash'
import { FaUser } from 'react-icons/fa'
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions'

import { IProfile } from '~/interfaces'
import ProfileAPI from '~/services/ProfileAPI'

import { MentionItem, ProfileImage, StepWrapper } from './style'

const InputMention: React.FC<{
  text: string
  placeholder: string
  inputCallback: (text: string) => void
}> = ({ text, placeholder, inputCallback }) => {
  const [suggestions, setSuggestions] = useState<IProfile[]>([])

  const debouncer = debounce(
    (query: string, callback: (data: SuggestionDataItem[]) => void) => {
      ProfileAPI.searchProfiles({ search: query }).then((profiles) => {
        const formatedSuggestions = profiles.map((profile) => {
          return {
            id: profile.userId,
            display: profile.userName,
          }
        })
        setSuggestions(profiles)
        callback(formatedSuggestions)
      })
    },
    2000
  )

  const searchProfiles = useCallback(
    (query: string, callback: (data: SuggestionDataItem[]) => void) => {
      callback([{ id: 0, display: 'loading' }])
      debouncer(query, callback)
    },
    []
  )

  const mentionTemplate = (mention: SuggestionDataItem) => {
    const avatar = useMemo(() => {
      return suggestions.find((profile) => profile.userId === mention.id)
    }, [])
    return (
      <>
        <MentionItem>
          {mention.display !== 'loading' && (
            <>
              <ProfileImage>
                {avatar?.profileImage ? (
                  <img
                    src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/profile/${avatar.profileImage}`}
                    alt={mention.display}
                  />
                ) : (
                  <FaUser className='defaultProfileImage' />
                )}
              </ProfileImage>
              {mention.display}
            </>
          )}
          {mention.display === 'loading' && <CircularProgress size={20} />}
        </MentionItem>
      </>
    )
  }

  return (
    <StepWrapper>
      <MentionsInput
        value={text}
        onChange={(e) => inputCallback(e.target.value)}
        placeholder={placeholder}
        className='direction-input'
      >
        <Mention
          trigger='@'
          data={searchProfiles}
          markup={`{"id": "__id__", "userName": "__display__"}`}
          renderSuggestion={mentionTemplate}
          displayTransform={(id, display) => `@${display}`}
          appendSpaceOnAdd
          className='mentioned'
        />
      </MentionsInput>
    </StepWrapper>
  )
}

export default InputMention
