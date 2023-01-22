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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;

  @media (min-width: 600px) {
    border-radius: 8px 8px 0 0;
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
`

export const PostImage = styled.img`
  width: 100%;
  cursor: pointer;
`

export const PostOptions = styled.div`
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
