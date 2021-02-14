import GlobalStyles from "features/theme/GlobalStyles"
import React from "react"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ThemeProvider } from "styled-components/macro"
import { ReactQueryDevtools } from "react-query/devtools"

import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"

const customHistory = createBrowserHistory()

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
    },
    mutations: {
      // mutation options
    },
  },
})

const typographyTheme = {
  fontSizes: ["2.369rem", "1.777rem", "1.333rem", "1rem", "0.75rem", "10px"],
  bodyFontFamily: "Inter, Source Code Pro, Input, monospace",
  headingFontFamily: "SF Display, Helvetica Neue, Circular, sans-serif",
  headingColor: "var(--color-text-1)",
  bodyColor: "var(--color-text-2)",
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <RecoilPersist /> */}
      <QueryClientProvider client={queryClient}>
        <GlobalStyles mode="light" />
        <ThemeProvider theme={{ typography: typographyTheme }}>
          <Router history={customHistory}>
            <App />
          </Router>
        </ThemeProvider>
        {process.env.NODE_ENV !== "production" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
