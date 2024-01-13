import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing:  border-box;
  }
  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
  }

  /* Min Height */
  html {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
  #__next,
  body {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    min-height: 100%;
    flex: 1;
  }
  /* Min Height */

  /* Default Hover */
  a,
  button {
    cursor: pointer;
    transition: .3s ease-in-out;
  }
  a:hover,
  button:hover {
    opacity: 0.5;
  }
`;


