import styled from 'styled-components'

export const ImgContainer = styled.div`
  max-width: 80vw;
  max-height: 90vh;
  overflow-y: auto;
`
export const CloseComponent = styled.div`
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
`
