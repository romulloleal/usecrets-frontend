import styled from 'styled-components'

export const CloseComponent = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: rgba(82, 83, 85, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 3;
  top: 5px;
  right: 5px;

  .closeIcon path {
    stroke: white;
  }
`
