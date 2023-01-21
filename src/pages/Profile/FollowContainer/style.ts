import styled from 'styled-components'

export const ActionButton = styled.div<{ bgColor?: string }>`
  margin-top: 10px;
  background-color: ${({ bgColor }) => bgColor || '#333333'};
  color: #ffffff;
  border-radius: 5px;
  width: 200px;
  height: 40px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
`
