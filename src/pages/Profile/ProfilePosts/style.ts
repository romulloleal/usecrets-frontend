import styled from 'styled-components'

export const ProfilePostsLayout = styled.div`
  width: 100%;
`

export const PrivateProfileLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2.5em;
    color: ${({ theme }) => theme.text};
  }
`
