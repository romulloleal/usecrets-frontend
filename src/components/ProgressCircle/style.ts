import styled from 'styled-components'

export const ProgressCircleContainer = styled.div<{ size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .content {
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};

    svg {
      width: ${({ size }) => `${size}px`};
      height: ${({ size }) => `${size}px`};
      transform: rotate(-90deg);
    }
  }

  .charsRemain {
    position: absolute;
    font-size: 0.75em;
  }
`
