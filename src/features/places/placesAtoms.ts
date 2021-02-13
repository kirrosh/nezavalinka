import { atom, atomFamily } from "recoil"

export const selectedPlaceIdAtom = atom<string | null>({
  key: "selectedPlaceId",
  default: null,
  // @ts-ignore
  persistence_UNSTABLE: {
    type: "selectedPlaceId",
  },
})
