import React, { useEffect } from "react"
import styled from "styled-components/macro"

import ReactMapGL, { Marker, MapController } from "react-map-gl"
import { usePlacesQuery } from "api/placesQueries"
import { useRecoilState } from "recoil"
import { viewportAtom } from "./mapAtoms"
import MapMarker from "./MapMarker"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import IPlace from "types/IPlace"

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  & > div {
    width: 100% !important;
    height: 100% !important;
  }
  & .mapboxgl-map {
    /* -webkit-border-radius: 0 0 64px 64px; */
    background-color: var(--color-bg-2);
  }
  .mapboxgl-ctrl-bottom-left {
    top: 8px;
    bottom: none;
  }
  .mapboxgl-ctrl-bottom-right {
    top: 0;
    bottom: none;
  }
`

const TOKEN =
  "pk.eyJ1Ijoia2lycm9zaCIsImEiOiJjazJqMHB6NGcwb2I4M25vMDhoNm12ZjdlIn0.ja_qH1I_OucomT94N2KHWQ"

const MapContainer = () => {
  // const [viewport, setViewport] = useRecoilState(viewportAtom)
  const [viewport, setViewport] = React.useState({
    // width: 800,
    // height: 600,
    latitude: 59.93594726398239,
    longitude: 30.284097034529644,
    zoom: 4,
  })
  const [id, setId] = useRecoilState(selectedPlaceIdAtom)
  const { data } = usePlacesQuery()

  useEffect(() => {
    const place: IPlace | undefined = data?.find(
      (place: IPlace) => place._id === id
    )
    if (place) {
      setViewport({
        ...viewport,
        latitude: Number(place.location.lat),
        longitude: Number(place.location.lng),
      })
    }
  }, [id, data])

  return (
    <MapWrapper>
      <ReactMapGL
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/kirrosh/ckidgapbv21jc19n1jou11m39"
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      >
        {data?.map((item) => {
          if (item.location)
            return (
              <Marker
                key={item._id}
                latitude={Number(item.location?.lat)}
                longitude={Number(item.location?.lng)}
              >
                <MapMarker
                  onClick={() => setId(item._id)}
                  isActive={item._id === id}
                />
              </Marker>
            )
        })}
      </ReactMapGL>
    </MapWrapper>
  )
}

export default MapContainer
