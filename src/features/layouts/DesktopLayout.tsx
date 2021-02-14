import React, { useReducer, useState } from "react"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"
import styled from "styled-components/macro"
import MapLayout from "./MapLayout"
import { Icon, IconButton } from "rsuite"
import { Heading } from "styled-typography"
import DesktopLeftPanel from "features/desktop/left-panel/DesktopLeftPanel"
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"
import IconElement from "features/theme/IconElement"

const StyledDesktop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const DrawerContent = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  height: 100vh;
  overflow: hidden;
`

const MapWrapper = styled.div`
  flex: 1;
  position: relative;
`

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 16px;
`

const StyledProSidebar = styled(ProSidebar)`
  color: #ffffff;
  & .pro-sidebar-inner {
    background-color: var(--color-bg1);
  }
`

const StyledMenu = styled(Menu)`
  background-color: var(--color-blue);
  color: #ffffff;
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`
const StyledMenuItem = styled(MenuItem)`
  background-color: var(--color-blue);
  color: #ffffff;
  & .pro-icon-wrapper {
    background: transparent !important;
  }
`

const DesktopLayout = () => {
  const [collapsed, setCollapsed] = useReducer((prev) => !prev, false)
  let history = useHistory()

  function goHome() {
    history?.push("/")
  }
  return (
    <StyledDesktop>
      <StyledProSidebar
        collapsed={collapsed}
        collapsedWidth={"0px"}
        width={600}
      >
        <DrawerContent>
          <StyledMenu iconShape="square">
            <StyledMenuItem
              icon={<IconElement name="home" />}
              onClick={goHome}
            />
            <StyledMenuItem
              icon={<IconElement name="person" />}
              onClick={goHome}
            />
            <StyledMenuItem
              icon={<IconElement name="chat" />}
              onClick={goHome}
            />
            <StyledMenuItem
              icon={<IconElement name="geopoint" />}
              onClick={goHome}
            />

            {/* <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu> */}
          </StyledMenu>
          <DesktopLeftPanel />
        </DrawerContent>
      </StyledProSidebar>
      <MapWrapper>
        <MapLayout />
        <CloseButtonWrapper>
          <IconButton
            onClick={setCollapsed}
            icon={<Icon icon={collapsed ? "angle-right" : "angle-left"} />}
          />
        </CloseButtonWrapper>
      </MapWrapper>
    </StyledDesktop>
  )
}

export default DesktopLayout
