import IconElement from "features/theme/IconElement"
import styled, { keyframes } from "styled-components/macro"

const pulsate = keyframes`
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0.0;
  }
  50% {
    opacity: 1.0;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
`

const bounce = keyframes`
   0% {

    opacity: 0;
    transform: translateY(-2000px) rotate(-45deg);
   }
  60% {

    opacity: 1;
    transform: translateY(30px) rotate(-45deg);
  } 
  80% {

    transform: translateY(-10px) rotate(-45deg);
  }
  100% {

    transform: translateY(0) rotate(-45deg);
  }
`

const Pin = styled.div<{ isActive: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: ${({ isActive }) =>
    isActive ? "var(--color-purple)" : "#89849b"};
  /* position: absolute; */
  /* transform: rotate(-45deg); */
  left: 50%;
  top: 50%;
  margin: -40px 0px 0px -15px;
  animation-name: ${bounce};
  animation-fill-mode: both;
  animation-duration: 1s;
  cursor: pointer;
  /* &:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #2f2f2f;
    position: absolute;
    border-radius: 50%;
  } */
`

const Marker = styled.div<{ isActive: boolean }>`
  left: 50%;
  top: 50%;
  margin: -40px 0px 0px -15px;
  animation-name: ${bounce};
  animation-fill-mode: both;
  animation-duration: 1s;
  cursor: pointer;
  position: absolute;

  color: ${({ isActive }) =>
    isActive ? "var(--color-purple)" : "var(--color-blue)"};
  & > * {
    transform: rotate(45deg);
  }
`

const Pulse = styled.div<{ isActive: boolean }>`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -9px 0px 0px -7px;
  transform: rotateX(55deg);
  z-index: -2;
  &:after {
    content: "";
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    animation: ${pulsate} 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px
      ${({ isActive }) => (isActive ? "var(--color-purple)" : "#89849b")};
    animation-delay: 1.1s;
  }
`

const Wrapper = styled.div`
  position: relative;
`

type Props = {
  onClick: () => void
  isActive: boolean
}

const MapMarker = ({ onClick, isActive }: Props) => {
  const handler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onClick()
  }
  return (
    <Wrapper onClick={handler}>
      <Marker isActive={isActive}>
        <IconElement name="marker" size="md" />
      </Marker>
      {/* <Pin isActive={isActive} />
      <Pulse isActive={isActive} /> */}
    </Wrapper>
  )
}

export default MapMarker
