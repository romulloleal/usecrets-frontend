import styled from 'styled-components'

export const HomeContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: 600px) {
    width: 80%;
  }
`
export const FeedSelector = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  margin-bottom: 10px;

  @media (min-width: 600px) {
    width: 500px;
  }
`

export const FeedSelectoOption = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50px;
  cursor: pointer;
  border-bottom: 3px solid ${({ selected }) => (selected ? '#1565c0' : 'none')};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export const NoPostsMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 2.5em;
  }
`
