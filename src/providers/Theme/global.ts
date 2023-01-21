import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
/* RESET */
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    font-family: "Open Sans", sans-serif;
    font-size: 1em;
    font-weight: 400;

    line-height: 1.2;
    letter-spacing: 0em;

    outline: none;

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    word-wrap: break-word;
  }

  a {text-decoration: none; color: ${({ theme }) => theme.text}}
  button {background: none; border: none;}
  input {background: none; border: none;}
  img{border: none; max-width: 100%; vertical-align: middle;}

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  .hide-scroll-bar::-webkit-scrollbar {
    display: none;
  }

  * {
    scrollbar-width: auto;
    scrollbar-color: #999999 #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.body};
  }

  *::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
    border: 3px solid ${({ theme }) => theme.body};
  }
`
