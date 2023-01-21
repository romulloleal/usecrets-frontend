import styled from 'styled-components'

export const ProfileCover = styled.div<{ coverImage?: string }>`
  width: 100%;
  max-width: 900px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.3);
  background-image: url(${({ coverImage }) => coverImage || ''});
  background-size: cover;
  background-position: center;
  position: relative;

  @media (min-width: 600px) {
    max-width: 900px;
    border-radius: 10px;
  }
`

export const ChangeCoverImage = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fafafa;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  position: absolute;
  right: 2%;
  bottom: 5%;

  svg {
    font-size: 1.5em;
    color: #000000;
  }
`

export const ProfileImage = styled.div`
  width: 150px;
  aspect-ratio: 1 / 1;
  background-color: #cccccc;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .defaultProfileImage {
    font-size: 5em;
    color: #ffffff;
  }
`
export const ChangeProfileImage = styled.div`
  width: 30px;
  height: 30px;
  background-color: #444444;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  position: absolute;
  right: 5%;
  bottom: 5%;

  svg {
    color: #fafafa;
  }
`

export const ChangeImageOptions = styled.div`
  width: 180px;
  background-color: #555;
  color: #fff;
  border-radius: 8px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  position: absolute;
  cursor: pointer;
  bottom: -70px;
  left: -140px;
  z-index: 3;
`

export const ChangeImageOption = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  svg {
    color: #fff;
    font-size: 1.2em;
  }
`
