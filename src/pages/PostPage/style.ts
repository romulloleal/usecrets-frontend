import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const PagePostLayout = styled.div`
  max-width: 500px;
  margin: 0 auto;
`
export const PostNotFoundOrPrivateComponent = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5em;
  text-align: center;

  svg {
    font-size: 2.5em;
  }
`

export const VisitProfile = styled(Link)`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #1565c0;
  color: #ffffff;
  border-radius: 5px;
  width: 150px;
  height: 40px;
  cursor: pointer;

  font-size: 0.85em;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
`

export const ProfileImage = styled.div`
  width: 150px;
  aspect-ratio: 1 / 1;
  background-color: #cccccc;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .defaultProfileImage {
    font-size: 3em;
    color: #ffffff;
  }
`
