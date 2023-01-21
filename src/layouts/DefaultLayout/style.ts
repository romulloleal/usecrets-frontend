import { Grid } from '@mui/material'
import styled from 'styled-components'

export const Header = styled(Grid)`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.head};
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 3;
`

export const HeaderContent = styled.div`
  width: 95%;
  display: grid;
  align-items: center;
  grid-gap: 10px;

  grid-template-columns: 140px 1fr;

  @media (min-width: 600px) {
    grid-template-columns: 140px 2fr 1fr 0.5fr;
  }

  @media (min-width: 800px) {
    width: 60%;
  }
`

export const MainContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 30px;

  @media (min-width: 600px) {
    padding-bottom: 0;
  }
`

export const Logo = styled(Grid)`
  background-image: url(${({ theme }) => theme.logo});
  background-size: cover;
  background-position: center;
  width: 140px;
  height: 36px;
`

export const LogginButton = styled.button`
  background-color: #1565c0;
  color: #ffffff;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  cursor: pointer;
  margin-left: 20px;

  &:disabled {
    background-color: #1565c0 !important;
  }
`
