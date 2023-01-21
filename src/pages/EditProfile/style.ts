import styled from 'styled-components'

export const EditProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;

  @media (min-width: 600px) {
    width: 500px;
    padding: 10px 30px;
    background-color: ${({ theme }) => theme.cardColor};
  }
`

export const ProfileItem = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
`

export const Input = styled.input`
  height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.searchInput};
  color: ${({ theme }) => theme.text};
  font-size: 0.85em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 10px;
`

export const Button = styled.button`
  margin-top: 10px;
  background-color: #1565c0;
  color: #ffffff;
  border-radius: 5px;
  width: 200px;
  height: 40px;
  cursor: pointer;

  &:disabled {
    background-color: #1565c0 !important;
  }
`
