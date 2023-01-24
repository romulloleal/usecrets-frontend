import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.85em;
  font-weight: 300;

  background-color: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardTextColor};
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (min-width: 600px) {
    border-radius: 8px;
  }
`

export const Header = styled.div`
  position: relative;
  @media (min-width: 600px) {
    border-radius: 8px 8px 0 0;
  }
`

export const HeaderLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 15px;
  margin-bottom: 10px;
`

export const PostOptions = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;

  svg {
    font-size: 1.2em;
  }
`

export const Options = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  width: 150px;
  top: 15px;
  border-radius: 3px;

  transition: all 0.2s ease;

  background-color: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardTextColor};

  box-shadow: ${({ theme }) => theme.boxShadow};
`

export const OptionItem = styled.div`
  width: 100%;
  text-align: center;
  padding: 5px 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export const ProfileImage = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #cccccc;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  svg {
    font-size: 20px;
    color: #ffffff;
  }
`

export const Author = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const ContentText = styled.div`
  padding: 5px;
  white-space: pre-wrap;

  .mention {
    padding: 1px;
    border-radius: 3px;
    background-color: rgb(21, 101, 192, 0.3);
  }
`

export const PostImage = styled.img`
  width: 100%;
  cursor: pointer;
`

export const PostInteractions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 15px;
  user-select: none;

  svg {
    font-size: 1.5em;
    cursor: pointer;
  }
`

export const LikeCount = styled.div`
  margin-left: 5px;
`
