import React, { useReducer, useState } from "react"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"
import styled from "styled-components/macro"
import MapLayout from "./MapLayout"
import { Icon, IconButton } from "rsuite"
import { Heading } from "styled-typography"
import DesktopLeftPanel from "features/desktop/left-panel/DesktopLeftPanel"
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"

const StyledDesktop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const DrawerContent = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr;
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

const DesktopLayout = () => {
  const [collapsed, setCollapsed] = useReducer((prev) => !prev, false)
  let history = useHistory()

  function goHome() {
    history?.push("/")
  }
  return (
    <StyledDesktop>
      <ProSidebar collapsed={collapsed} collapsedWidth={"0px"} width={600}>
        <DrawerContent>
          <Menu iconShape="round">
            <MenuItem icon={<Icon icon="home" />} onClick={goHome}>
              Home
            </MenuItem>
            {/* <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu> */}
          </Menu>
          <DesktopLeftPanel />
        </DrawerContent>
      </ProSidebar>
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
