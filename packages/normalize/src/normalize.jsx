import { createGlobalStyle, css } from 'styled-components/macro';

const normalizeStyles = css`
  * {
    margin: 0;
    padding: 0;
    color: inherit;
    font: inherit;
    font-size: 100%;
    text-decoration: none;
    vertical-align: inherit;
    background: none;
    background-color: transparent;
    border-color: currentColor;
    border-style: solid;
    border-width: 0;
    outline-width: 0;
    outline-style: solid;
    outline-color: currentColor;
    outline-offset: 0.5rem;
  }

  ::before,
  ::after {
    text-decoration: inherit;
    vertical-align: inherit;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  :root {
    color: #000;
    font: 100%/1.5 system-ui, sans-serif;
    text-align: left;
    vertical-align: baseline;
    tab-size: 4;
    -webkit-tap-highlight-color: transparent;
    text-size-adjust: 100%;
    text-rendering: optimizeSpeed;
    background-color: #fff;
  }

  [tabindex='-1']:focus {
    outline: 0 !important;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none !important;
  }
`;

const Normalize = createGlobalStyle(normalizeStyles);

export default Normalize;
