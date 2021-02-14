import { usePlaceQuery } from "api/placesQueries"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import React from "react"
import { useQueryClient } from "react-query"
import { Link, matchPath, useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { Panel } from "rsuite"
import styled from "styled-components/macro"
import { Heading, Text } from "styled-typography"
import ICategory from "types/ICategory"
import IPlace from "types/IPlace"

const Card = styled.div`
  background: #fffafa;
  box-shadow: 0px 4px 20px rgba(17, 17, 17, 0.33);
  border-radius: 32px;
  margin-bottom: 32px;
  padding: 16px;
`

const Photo = styled.img`
  width: 100%;
  height: 240px;
  background: #fffafa;
  box-shadow: 0px 4px 20px rgba(17, 17, 17, 0.33);
  border-radius: 32px;
  margin-bottom: 32px;
  object-fit: cover;
`

type Props = {
  place: IPlace
}

const PlaceInfo = ({ place }: Props) => {
  return (
    <div>
      <Card>
        <Heading level={2}>{place.name}</Heading>
      </Card>
      <Card>
        <Heading level={4}>Описание</Heading>
        <Text>{place.description}</Text>
      </Card>
      {place.canHelp && (
        <Card>
          <Heading level={4}>Помогу</Heading>
          <Text>{place.canHelp}</Text>
        </Card>
      )}
      {place.searchHelp && (
        <Card>
          <Heading level={4}>Ищу</Heading>
          <Text>{place.searchHelp}</Text>
        </Card>
      )}
      {place.photoUrl && <Photo src={place.photoUrl} />}
      {place.contacts && (
        <Card>
          <Heading level={4}>Контакты</Heading>
          <Text>{place.contacts}</Text>
        </Card>
      )}
    </div>
  )
}

export const PlaceInfoRoute = () => {
  const location = useLocation()
  const match = matchPath<{ placeId: string }>(location.pathname, {
    path: "/places/:placeId",
    exact: true,
    strict: true,
  })
  const placeId = match?.params.placeId
  const { data } = usePlaceQuery(placeId)

  return data ? <PlaceInfo place={data} /> : null
}

export default PlaceInfo
