import { usePlaceQuery } from "api/placesQueries"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components/macro"
import { Heading } from "styled-typography"
import InfoPanel from "./InfoPanel"

type Props = {
  isOpen: boolean
  height: number
}

const Title = styled(Heading)`
  height: 60px;
  display: grid;
  place-items: center;
`

const PanelWrapper = styled.div`
  padding: 0 16px;
  .swiper-container {
    height: 100%;
  }
  /* height: 100%; */
`

const CarWrapper = styled.div`
  overflow: hidden;
`

const InfoPanelContainer = ({ isOpen, height }: Props) => {
  const selectedPlace = useRecoilValue(selectedPlaceIdAtom)
  const { data } = usePlaceQuery(selectedPlace)

  if (!data) return null

  return (
    <PanelWrapper style={{ height: height - 60 }}>
      <Title level={2}>{data?.name}</Title>
      <InfoPanel place={data!} />
    </PanelWrapper>
  )
}

export default InfoPanelContainer
