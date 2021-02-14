import { useCategoriesQuery } from "api/categoriesQuery"
import { usePlacesQuery } from "api/placesQueries"
import IconElement from "features/theme/IconElement"
import React from "react"
import { Link, Route, Switch } from "react-router-dom"
import { Button, Icon, IconButton } from "rsuite"
import styled from "styled-components"
import { Heading, Span } from "styled-typography"
import PlaceInfo, { PlaceInfoRoute } from "./PlaceInfo"
import PlacesList, { PlacesListRoute } from "./PlacesList"

const StyledDesktopLeftPanel = styled.div`
  padding: 64px 32px;
  height: 100vh;
  overflow-y: auto;
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
`
const CategoryButton = styled(IconButton)`
  background-color: var(--color-blue);
  color: #fff;
  &.rs-btn.rs-btn-icon {
    padding: 4px 12px;
    height: auto;
    display: grid;
    place-items: center;
  }
`

const ButtonWithText = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
  ${Span} {
    min-width: 300px;
  }
  &:hover {
    cursor: pointer;
    ${Span} {
      text-decoration: underline;
    }
  }
  a {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
  }
`

const DesktopLeftPanel = () => {
  const { data } = useCategoriesQuery()
  return (
    <StyledDesktopLeftPanel>
      <Switch>
        <Route path="/categories/:categoryId">
          <PlacesListRoute />
        </Route>
        <Route path="/places/:placeId">
          <PlaceInfoRoute />
        </Route>
        <Route path="/">
          <Heading label="1">#НЕЗАВАЛИНКА</Heading>
          <CategoriesGrid>
            {data?.map((item) => (
              <ButtonWithText key={item._id}>
                <CategoryButton
                  icon={<IconElement name={item.icon as any} />}
                />
                <Link to={`/categories/${item._id}`}>
                  <Span>{item.title}</Span>
                </Link>
              </ButtonWithText>
            ))}
          </CategoriesGrid>
        </Route>
      </Switch>
    </StyledDesktopLeftPanel>
  )
}

export default DesktopLeftPanel
