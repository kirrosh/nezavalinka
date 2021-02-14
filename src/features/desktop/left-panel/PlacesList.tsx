import { usePlacesQuery } from "api/placesQueries"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import React from "react"
import { useQueryClient } from "react-query"
import { Link, matchPath, useHistory, useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { Button, Panel } from "rsuite"
import styled from "styled-components/macro"
import { Heading, Text } from "styled-typography"
import ICategory from "types/ICategory"
import IPlace from "types/IPlace"
import placeholder from "assets/placeholder.png"
type PlaceCardProps = {
  place: IPlace
}

const PlaceImage = styled.div`
  border-radius: 16px;
  height: 128px;
  width: 100%;
  background-color: var(--color-bg-4);
`

const Chat = styled.div`
  background: var(--color-blue);
  padding: 12px 16px;
  margin-bottom: 32px;
  ${Heading} {
    color: #fff;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
  }
  a {
    margin-top: 8px;
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
      {category?.tgChat && (
        <Chat>
          <Heading level={4}>
            Присоединяйся к тематическому чату
            <br />
            <Button
              appearance="primary"
              href={category.tgChat}
              target={"_blank"}
            >
              Перейти к чату
            </Button>
          </Heading>
        </Chat>
      )}
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
              <Photo src={place.photoUrl || placeholder} />
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
