import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    *:focus:not(:focus-visible) {
      outline: none;
    }

    *:focus {
      outline: 1px solid #000;
    }
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width:720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: ${props => props.theme.colors.branco};
    font: 400 16px 'Roboto';
    -webkit-font-smoothing: antialiased;
  
    ::-webkit-scrollbar {
      width: 4px;
      border-radius: 10px;
      height: 4px;
    }

    ::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #000;
      border-radius: 10px;
    }
  }

  button {
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
  }
  
  h1, h2, h3{
    font-family: 'Roboto', sans-serif;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
