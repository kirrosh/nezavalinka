import React from "react"
import { FontWeight, Link, Text } from "styled-typography"
import IPlace from "types/IPlace"

import placeholder from "assets/images/placeholder.png"
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
const Photo = styled.img`
  width: 100%;
  height: 240px;
  background: #fffafa;
  box-shadow: 0px 4px 20px rgba(17, 17, 17, 0.33);
  border-radius: 32px;
  margin-top: 16px;
  object-fit: cover;
`

const InfoPanel = ({ place }: InfoProps) => {
  return (
    <Wrapper>
      {/* <TagListContainer id={place._id} /> */}

      <Photo src={place.photoUrl || placeholder} />
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
