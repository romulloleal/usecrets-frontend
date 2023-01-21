import styled from 'styled-components'

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    width: 80%;
    max-width: 900px;
    margin: 0 auto;
  }
`

export const UserName = styled.div`
  width: 100%;
  font-size: 1.8em;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-top: 50px;
`

export const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`

export const ProfileStatsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;

  .title {
    font-size: 0.7em;
  }
`
