import { atom } from "recoil"
import { ViewportProps } from "react-map-gl"

export const viewportAtom = atom<Partial<ViewportProps>>({
  key: "viewport",
  default: {
    latitude: 54.70707250229553,
    longitude: 20.508666656096,
    zoom: 12,
    transitionDuration: 300,
  },
})
