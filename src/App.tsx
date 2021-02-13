import { useCategoriesQuery } from "api/categoriesQuery"
import DesktopLayout from "features/layouts/DesktopLayout"
import MobileLayout from "features/layouts/MobileLayout"
import React, { useEffect, useRef, useState } from "react"
import { BrowserView, MobileView } from "react-device-detect"
import styled from "styled-components"
import "rsuite/dist/styles/rsuite-default.css"

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  & > div {
    height: 100%;
    width: 100%;
  }
`

function App() {
  const [height, setHeight] = useState(0)
  // const [value, setValue] = useLocalStorage("query-cache")
  const wrapperRef = useRef<HTMLDivElement>(null)
  // const queryClient = useQueryClient()
  useEffect(() => {
    // hydrate(queryClient, value)
    // window.onbeforeunload = function (e: any) {
    //   const dehydratedState = dehydrate(queryClient)
    //   setValue(dehydratedState)
    // }
    if (window.innerHeight) {
      setHeight(window.innerHeight)
    }
    window.addEventListener("resize", () => {
      // We execute the same script as before
      setHeight(window.innerHeight)
      // let vh = window.innerHeight * 0.01
      // document.documentElement.style.setProperty("--vh", `${vh}px`)
    })
    // return () => {
    //   const dehydratedState = dehydrate(queryClient)
    //   setValue(dehydratedState)
    // }
  }, [])
  return (
    <AppWrapper ref={wrapperRef} style={{ height }}>
      <BrowserView>
        <DesktopLayout />
      </BrowserView>
      <MobileView>{height && <MobileLayout height={height} />}</MobileView>
    </AppWrapper>
  )
}

export default App
