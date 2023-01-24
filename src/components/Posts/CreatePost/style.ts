import { Box } from '@mui/material'
import styled from 'styled-components'

export const CreatePostLayout = styled(Box)`
  position: relative;
  max-width: 500px;
  background-color: ${({ theme }) => theme.cardColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 10px 15px 25px 15px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

export const TextContent = styled.div`
  position: relative;
  width: 100%;
  min-height: 50px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  padding: 2px 10px;
  border-radius: 5px;
`

export const PostFile = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
  }
`

export const CloseButton = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: #525355;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  right: 5px;

  svg path {
    stroke: white;
  }
`

export const Options = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`
