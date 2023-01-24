import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  padding: 5px;
  user-select: none;
  width: 100%;

  @media (min-width: 600px) {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 8px;
    overflow-y: scroll;
    font-size: 0.55em;
    background-color: ${({ theme }) => theme.cardColor};
    top: 45px;
    right: -20px;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`

export const Title = styled.div`
  font-size: 1.3em;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
`

export const MarkAllAsRead = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75em;
  cursor: pointer;

  &:hover {
    border-bottom: 0.5px solid ${({ theme }) => theme.cardTextColor};
  }
`

export const NotificationsItem = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 10px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .fromUser {
    font-weight: 700;
    margin-right: 3px;
    cursor: pointer;
  }
`

export const ProfileImage = styled(Link)`
  min-width: 35px;
  min-height: 35px;
  max-width: 35px;
  max-height: 35px;
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
    font-size: 25px;
    color: #ffffff;
  }
`

export const NotificationDescription = styled.div`
  display: flex;
  align-items: center;

  .newNotification {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    right: 5px;
    background-color: #fa4848;
  }
`

export const Button = styled.button<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: #ffffff;
  border-radius: 5px;
  width: 50px;
  padding: 2px;
  font-size: 0.9em;
  cursor: pointer;
  margin-left: 10px;

  &:disabled {
    background-color: ${({ bgColor }) => bgColor} !important;
  }
`
