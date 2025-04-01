import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

