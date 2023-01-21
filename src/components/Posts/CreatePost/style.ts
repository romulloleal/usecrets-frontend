import { Box } from '@mui/material'
import styled from 'styled-components'

export const BoxStyle = styled(Box)`
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

  .textField {
    position: relative;
    width: 100%;
    /* max-height: 300px; */
    overflow-y: auto;
    border: 1px solid ${({ theme }) => theme.inputBorder};
    padding: 2px 10px;
    border-radius: 5px;

    .file {
      position: relative;
    }

    .file .close {
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

      .closeIcon path {
        stroke: white;
      }
    }

    img {
      width: 100%;
    }

    textarea {
      color: ${({ theme }) => theme.cardTextColor};
    }
  }
`

export const TextFieldBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`
