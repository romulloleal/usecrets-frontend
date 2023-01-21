import { useEffect, useState } from 'react'

import { useAuth } from '~/providers/Auth'
import { translate } from '~/utils/Translate'

import Explore from './Explore'
import Following from './Following'
import { FeedSelectoOption, FeedSelector, HomeContainer } from './style'

const Home = () => {
  const { user } = useAuth()

  const [selectedFeed, setSelectedFeed] = useState('explore')

  useEffect(() => {
    setSelectedFeed('explore')
  }, [user])

  return (
    <HomeContainer>
      {user && (
        <FeedSelector>
          <FeedSelectoOption
            selected={selectedFeed === 'explore'}
            onClick={() => setSelectedFeed('explore')}
          >
            {translate('explore')}
          </FeedSelectoOption>
          <FeedSelectoOption
            selected={selectedFeed === 'following'}
            onClick={() => setSelectedFeed('following')}
          >
            {translate('following')}
          </FeedSelectoOption>
        </FeedSelector>
      )}

      {selectedFeed === 'explore' && <Explore />}
      {user && selectedFeed === 'following' && <Following />}
    </HomeContainer>
  )
}

export default Home
