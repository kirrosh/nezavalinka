import { usePlacesQuery } from "api/placesQueries"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import React from "react"
import { useQueryClient } from "react-query"
import { matchPath, useHistory, useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
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

const Place = styled.div`
  cursor: pointer;
  &:hover {
    ${Heading} {
      text-decoration: underline;
    }
  }
`

const Photo = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`
const List = styled.div`
  overflow: auto;
`

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <StyledPlaceCard>
      <PlaceImage />
      <Heading level={3}>{place.name}</Heading>
    </StyledPlaceCard>
  )
}

type Props = {
  category?: ICategory
}

const PlacesList = ({ category }: Props) => {
  const history = useHistory()
  const [id, setId] = useRecoilState(selectedPlaceIdAtom)

  const onClick = (placeId: string) => {
    history?.push(`/places/${placeId}`)
    setId(placeId)
  }
  const { data: places } = usePlacesQuery(category?._id)
  return (
    <div>
      <Heading level={1}>{category?.title}</Heading>
      <List>
        {places?.map((place) => (
          <Place onClick={() => onClick(place._id)} key={place._id}>
            <Panel
              shaded
              bodyFill
              style={{
                display: "inline-block",
                width: "100%",
                margin: "16px 0 0 0",
              }}
            >
              <Photo src={place.photoUrl} />
            </Panel>
            <Heading level={4}>{place.name}</Heading>
          </Place>
        ))}
      </List>
    </div>
  )
}

export const PlacesListRoute = () => {
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

  return category ? <PlacesList category={category} /> : null
}

export default PlacesList
