import MapContainer from "features/map/MapContainer"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import React from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"

const StyledApp = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--color-bg-1);
  display: grid;
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

type Props = {
  onClick?: (isOpen: boolean) => void
}

function MapLayout({ onClick }: Props) {
  const [id, setId] = useRecoilState(selectedPlaceIdAtom)
  const handler = () => {
    setId(null)
  }
  return (
    <StyledApp>
      <MapWrapper onClick={handler}>
        <MapContainer />
      </MapWrapper>
      {/* <Footer>
        <Heading level={4}>Калининград</Heading>
      </Footer> */}
    </StyledApp>
  )
}

export default MapLayout
