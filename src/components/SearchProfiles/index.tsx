import React, { useState, useEffect, useRef } from 'react'

import { CircularProgress } from '@mui/material'
import { FaUser } from 'react-icons/fa'

import { IProfile } from '~/interfaces'
import ProfileAPI from '~/services/ProfileAPI'
import { useDebounce } from '~/utils/Debounce'
import { translate } from '~/utils/Translate'

import {
  ErrorMessage,
  ProfileImage,
  ResultsItem,
  SearchContainer,
  SearchInput,
  SearchResults,
} from './style'

const SearchProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<IProfile[] | undefined>()
  const [loadingProfiles, seLoadingProfiles] = useState<boolean>(false)
  const [showResults, setShowResults] = useState(false)

  const searchProfileComponentRef = useRef<HTMLDivElement>(null)

  // used to close search results when clicked out
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        searchProfileComponentRef.current &&
        !searchProfileComponentRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
      if (
        searchProfileComponentRef.current &&
        searchProfileComponentRef.current.contains(event.target as Node) &&
        profiles &&
        profiles.length > 0
      ) {
        setShowResults(true)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [profiles])

  const debounce = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    async (e) => {
      setProfiles([])
      const { value } = e.target
      if (value.length >= 3) {
        setShowResults(true)
        seLoadingProfiles(true)
        await searchProfiles(value)
      }
      if (value.length === 0) setProfiles([])
    },
    2000
  )

  const searchProfiles = async (search: string) => {
    const response = await ProfileAPI.searchProfiles({ search })
    setProfiles(response)
    seLoadingProfiles(false)
  }

  return (
    <SearchContainer ref={searchProfileComponentRef}>
      <SearchInput
        type='text'
        placeholder={translate('search')}
        onChange={debounce}
      />

      {showResults && (
        <SearchResults>
          {profiles &&
            profiles.length > 0 &&
            profiles.map((profile) => (
              <ResultsItem
                to={`/profile/${profile.userName}`}
                key={profile.id}
                onClick={() => setShowResults(false)}
              >
                <ProfileImage>
                  {profile.profileImage ? (
                    <img
                      src={`${process.env.REACT_APP_IMAGES_REPOSITORY_URL}/files/profile/${profile.profileImage}`}
                      width={40}
                      height={40}
                      alt={profile.userName}
                    />
                  ) : (
                    <FaUser />
                  )}
                </ProfileImage>
                {profile.userName}
              </ResultsItem>
            ))}
          {loadingProfiles && <CircularProgress size={20} color='primary' />}
          {!loadingProfiles && profiles && profiles.length <= 0 && (
            <ErrorMessage>{translate('noResultsFound')}</ErrorMessage>
          )}
        </SearchResults>
      )}
    </SearchContainer>
  )
}

export default SearchProfiles
