import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin: 0 auto;

  @media (min-width: 600px) {
    padding-bottom: 0px;
    min-width: 200px;
    width: 100%;
    max-width: 300px;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.searchInput};
  color: ${({ theme }) => theme.text};
  font-size: 0.85em;
  border: none;
  padding: 0 10px;
`

export const SearchResults = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: relative;
  padding: 5px;
  font-size: 0.85em;

  @media (min-width: 600px) {
    position: absolute;
    width: 300px;
    height: 400px;
    border-radius: 8px;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.cardColor};
    top: 45px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`

export const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ResultsItem = styled(Link)`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 700;
  flex-wrap: nowrap;
  gap: 10px;
  cursor: pointer;
`

export const ProfileImage = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #cccccc;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  svg {
    font-size: 25px;
    color: #ffffff;
  }
`
