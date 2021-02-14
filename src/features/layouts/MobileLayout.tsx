import InfoPanelContainer from "features/places/InfoPanelContainer"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import React, { useCallback, useEffect, useState } from "react"
import { useSpring, animated, config } from "react-spring"
import { useDrag } from "react-use-gesture"
import { useRecoilState } from "recoil"
import styled from "styled-components/macro"
import MapLayout from "./MapLayout"

const Panel = styled(animated.div)`
  z-index: 100;
  position: fixed;
  height: calc(100vh + 100px);
  width: 100vw;
  border-radius: 64px 64px 0px;
  background: var(--color-bg-1);
  touch-action: none;
  /* overflow: hidden; */
  /* 
  & > div {
    height: 60px;
    border-bottom: 1px solid var(--color-bg-3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    text-transform: capitalize;
  } */
`

type Props = {
  height: number
}

const MobileLayout = ({ height }: Props) => {
  const [{ y }, set] = useSpring(() => ({ y: height }))
  const [isOpen, setOpen] = useState(false)

  const open = ({ canceled }: { canceled: boolean }) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    set({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff,
      onDelayEnd: () => setOpen(true),
    })
  }
  const close = (velocity = 0) => {
    set({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity },
      onDelayEnd: () => setOpen(false),
    })
  }

  const onClick = useCallback(
    (isOpen: boolean) => {
      console.log(isOpen)
      isOpen ? open({ canceled: false }) : close()
    },
    [open, close]
  )

  const [id, setId] = useRecoilState(selectedPlaceIdAtom)
  useEffect(() => {
    console.log(id)
    id ? onClick(true) : onClick(false)
  }, [id])

  const bind = useDrag(
    ({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) cancel()

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) {
        my > height * 0.5 || vy > 0.5 ? close(vy) : open({ canceled })
      }
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else set({ y: my, immediate: true })
    },
    {
      initial: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
      threshold: 20,
    }
  )

  const display = y?.to((py) => (py < height ? "block" : "none"))

  const bgStyle = {
    transform: y?.to(
      [0, height],
      ["translateY(-8%) scale(1.16)", "translateY(0px) scale(1.00)"]
    ),
    opacity: y?.to([0, height], [0.4, 1], "clamp"),
    width: "100%",
    height: "100%",
  }
  return (
    <>
      <animated.div style={bgStyle as any}>
        <MapLayout onClick={onClick} />
      </animated.div>
      <Panel
        {...bind()}
        // style={{ display, bottom: ` calc(-100vh + 240px)`, y }}
        style={{ display, bottom: ` calc(-100vh + ${height / 2}px)`, y }}
      >
        <InfoPanelContainer isOpen={isOpen} height={height / 2} />
      </Panel>
    </>
  )
}

export default MobileLayout
