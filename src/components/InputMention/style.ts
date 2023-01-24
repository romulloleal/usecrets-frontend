import styled from 'styled-components'

export const MentionItem = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;

  color: ${({ theme }) => theme.cardTextColor};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
export const ProfileImage = styled.div`
  width: 35px;
  aspect-ratio: 1 / 1;
  background-color: #cccccc;
  border-radius: 50%;

  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .defaultProfileImage {
    font-size: 20px;
    color: #ffffff;
  }
`

export const StepWrapper = styled.div`
  textarea {
    border: none;
    appearance: none;
    box-shadow: none;
    width: 100%;
    transition: all 0.2s ease;
    color: ${({ theme }) => theme.cardTextColor};
  }

  .direction-input {
    min-height: 70px;
    border-radius: 8px;
    .direction-input__suggestions {
      position: absolute;
      top: 8px !important;
      z-index: 4 !important;
      background-color: ${({ theme }) => theme.cardColor} !important;
      box-shadow: ${({ theme }) => theme.boxShadow};
      .direction-input__suggestions__item--focused {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .direction-input__highlighter {
      .mentioned {
        border-radius: 3px;
        background-color: rgb(21, 101, 192, 0.3);
      }
    }
  }
`
