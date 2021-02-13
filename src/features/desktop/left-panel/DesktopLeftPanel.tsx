import { useCategoriesQuery } from "api/categoriesQuery"
import { usePlacesQuery } from "api/placesQueries"
import React from "react"
import { Button, Icon, IconButton } from "rsuite"
import styled from "styled-components"
import { Heading, Span } from "styled-typography"

const StyledDesktopLeftPanel = styled.div`
  padding: 64px 32px;
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
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
`

const DesktopLeftPanel = () => {
  const { data } = useCategoriesQuery()
  const { data: places } = usePlacesQuery()
  return (
    <StyledDesktopLeftPanel>
      <Heading label="1">#НЕЗАВАЛИНКА</Heading>
      <CategoriesGrid>
        {data?.map((item) => (
          <ButtonWithText key={item._id}>
            <IconButton icon={<Icon icon="bank" />} />
            <Span>{item.title}</Span>
          </ButtonWithText>
        ))}
      </CategoriesGrid>
    </StyledDesktopLeftPanel>
  )
}

export default DesktopLeftPanel
