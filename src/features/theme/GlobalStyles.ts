import { createGlobalStyle, css } from "styled-components/macro"
import "@fontsource/inter"
type TMode = "light" | "dark"

const common = css`
  --color-purple: #8855ff;
  --color-blue: #4565d7;
  --color-red: #dc524c;
  --color-green: #7bb86f;
  --color-yellow: #f8cd76;
  --color-emerald: #52a899;
`

const dark = css`
  --color-bg-1: #111111;
  --color-bg-2: #1d1d1d;
  --color-bg-3: #2b2b2b;
  --color-bg-4: #555555;

  --color-text-1: #ffffff;
  --color-text-2: #eeeeee;
  --color-text-3: #999999;
`

const light = css`
  --color-bg-1: #ffffff;
  --color-bg-2: #f3f3f3;
  --color-bg-3: #f3f3f3;
  --color-bg-4: #ffffff;

  --color-text-1: #000000;
  --color-text-2: #333333;
  --color-text-3: #999999;
`

const GlobalStyles = createGlobalStyle<{ mode: TMode }>`
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: Inter, Open-Sans, Helvetica, Sans-Serif;
    -webkit-font-smoothing: antialiased;
    background-color: var(--color-bg-1);

  ${common}
  ${(props) => (props.mode === "dark" ? dark : light)}
  
  }
  html {
    overflow: hidden;
  }
  #root {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }


`

export default GlobalStyles
