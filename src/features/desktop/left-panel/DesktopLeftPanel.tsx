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
import Frame1 from "assets/filters/Frame1.png"
import Frame2 from "assets/filters/Frame2.png"
import Frame3 from "assets/filters/Frame3.png"
import Frame4 from "assets/filters/Frame4.png"
import { FilteredPlacesListRoute } from "./FilteredPlacesList"

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

// const LargeCategoriesGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 16px;
//   margin-top: 32px;
// `

const LargeCategory = styled.div`
  background: var(--color-blue);
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  ${Heading} {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #fff;
    padding: 16px 0 0 16px;
    position: absolute;
  }
`

const FilterImage = styled.img`
  background: transparent;
  border-radius: 16px;
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
  }
  a {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    text-decoration: none;
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
        <Route path="/filter/:filterId">
          <FilteredPlacesListRoute />
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
          <CategoriesGrid>
            <Link to={`/filter/volunteer`}>
              <LargeCategory>
                <Heading level={2}>Стать волонтером</Heading>
                <FilterImage src={Frame1} />
              </LargeCategory>
            </Link>
            <LargeCategory>
              <Heading level={2}>Хочу переехать</Heading>
              <FilterImage src={Frame2} />
            </LargeCategory>
            <LargeCategory>
              <Heading level={2}>Переехать в гости</Heading>
              <FilterImage src={Frame3} />
            </LargeCategory>
            <LargeCategory>
              <Heading level={2}>Овладеть ремеслом</Heading>
              <FilterImage src={Frame4} />
            </LargeCategory>
          </CategoriesGrid>
        </Route>
      </Switch>
    </StyledDesktopLeftPanel>
  )
}

export default DesktopLeftPanel
