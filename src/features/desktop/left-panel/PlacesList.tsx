import { usePlacesQuery } from "api/placesQueries"
import React from "react"
import { useQueryClient } from "react-query"
import { matchPath, useLocation } from "react-router-dom"
import { Panel } from "rsuite"
import styled from "styled-components/macro"
import { Heading } from "styled-typography"
import ICategory from "types/ICategory"
import IPlace from "types/IPlace"

type PlaceCardProps = {
  place: IPlace
}

const PlaceImage = styled.div`
  border-radius: 16px;
  height: 128px;
  width: 100%;
  background-color: var(--color-bg-4);
`

const StyledPlaceCard = styled.div`
  display: grid;
  gap: 8px;
  margin: 16px 0;
  cursor: pointer;
  &:hover {
    ${Heading} {
      text-decoration: underline;
    }
  }
`

const Card = styled(Panel)`
  .rs-panel-heading {
    color: var(--color-text-2);
  }
`

const Photo = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <StyledPlaceCard>
      <PlaceImage />
      <Heading level={3}>{place.name}</Heading>
    </StyledPlaceCard>
  )
}

type Props = {}

const PlacesList = () => {
  const location = useLocation()
  const match = matchPath<{ categoryId: string }>(location.pathname, {
    path: "/categories/:categoryId",
    exact: true,
    strict: true,
  })
  const queryClient = useQueryClient()
  const category = queryClient.getQueryData<ICategory>([
    "categories",
    match?.params.categoryId,
  ])
  const { data: places } = usePlacesQuery(category?._id)

  return (
    <div>
      <Heading level={1}>{category?.title}</Heading>
      {places?.map((place) => (
        <Panel
          shaded
          // bordered
          bodyFill
          style={{
            display: "inline-block",
            width: "100%",
            margin: "16px 0 16px 0",
          }}
        >
          <Photo src={place.photoUrl} />
          <Card header={place.name}>
            <p>
              <small>{place.description}</small>
            </p>
          </Card>
        </Panel>
        // <PlaceCard place={place} key={place._id} />
      ))}
    </div>
  )
}

export default PlacesList
