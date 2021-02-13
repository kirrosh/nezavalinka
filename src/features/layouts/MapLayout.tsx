import MapContainer from "features/map/MapContainer"
import React from "react"
import styled from "styled-components"
// import { Heading } from "styled-typography"

const StyledApp = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--color-bg-1);
  display: grid;
  /* grid-template-rows: 1fr 64px; */
`

const MapWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const Cards = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
`

const Floating = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-color: var(--color-purple);
`

// const Footer = styled.div`
//   display: grid;
//   place-items: center;
//   background-color: var(--color-bg-1);
//   ${Heading} {
//     color: var(--color-purple);
//   }
// `
type Props = {
  onClick?: (isOpen: boolean) => void
}

function MapLayout({ onClick }: Props) {
  return (
    <StyledApp>
      <MapWrapper onClick={() => onClick && onClick(false)}>
        <MapContainer />
        <Floating
          onClick={(e) => {
            e.stopPropagation()
            onClick && onClick(true)
          }}
        />
        {/* <Cards
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <PlaceCarouselContainer
            childType="card"
            openPanel={() => {
              onClick && onClick(true)
            }}
          />
        </Cards> */}
      </MapWrapper>
      {/* <Footer>
        <Heading level={4}>Калининград</Heading>
      </Footer> */}
    </StyledApp>
  )
}

export default MapLayout
