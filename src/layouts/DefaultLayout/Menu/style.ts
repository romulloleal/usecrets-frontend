import { Box } from '@mui/system'
import styled from 'styled-components'

export const MenuContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  gap: 10px;
  font-size: 1.5em;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  height: 40px;
  z-index: 3;

  background-color: ${({ theme }) => theme.head};

  position: fixed;
  bottom: 0;
  left: 0;

  a {
    display: flex;
    align-items: center;
  }

  @media (min-width: 600px) {
    justify-content: flex-end;
    height: 100%;
    border-top: 0;
    background-color: none;
    position: relative;
  }

  svg {
    cursor: pointer;
  }

  .notifications {
    position: relative;
    display: flex;
    align-items: center;

    .newNotifications {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: absolute;
      bottom: 3px;
      right: 0px;
      background-color: #fa4848;
    }
  }
`
