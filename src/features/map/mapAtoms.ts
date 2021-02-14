import { atom } from "recoil"
import { ViewportProps } from "react-map-gl"

export const viewportAtom = atom<Partial<ViewportProps>>({
  key: "viewport",
  default: {
    latitude: 59.93594726398239,
    longitude: 30.284097034529644,
    zoom: 1,
  },
})
