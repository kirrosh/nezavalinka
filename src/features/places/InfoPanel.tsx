import React from "react"
import { FontWeight, Link, Text } from "styled-typography"
import IPlace from "types/IPlace"

// import { ReactComponent as IntIcon } from "assets/instagram.svg"
// import { ReactComponent as MapsIcon } from "assets/maps.svg"
// import TagListContainer from "features/tags/TagListContainer"
// import Markdown from "../info/Markdown"
import styled from "styled-components/macro"

type InfoProps = {
  place: IPlace
}

// const Icon = styled(IntIcon)`
//   width: 32px;
//   height: 32px;
//   padding: 8px;
//   background-color: var(--color-purple);
//   border-radius: 16px;
// `

const Icons = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 8px;
`

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`

const InfoPanel = ({ place }: InfoProps) => {
  return (
    <Wrapper>
      {/* <TagListContainer id={place._id} /> */}
      <Text level={4} fontWeight={FontWeight.Light}>
        {place.address}
      </Text>
      {/* {place.markdown && <Markdown markdown={place.markdown} />} */}
      {/* <Icons>
        {place.inst && (
          <Link href={place.inst} target="_blank">
            <Icon />
          </Link>
        )}
        {place.gmapsLink && (
          <Link href={place.gmapsLink} target="_blank">
            <Icon as={MapsIcon} />
          </Link>
        )}
      </Icons> */}
    </Wrapper>
  )
}

export default InfoPanel
