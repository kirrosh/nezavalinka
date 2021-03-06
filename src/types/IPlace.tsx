type IPlace = {
  name: string
  // address?: string
  // fullAddress: string
  _id: string
  canHelp: string
  searchHelp: string
  description: string
  contacts: string
  type: "activist" | "project"
  location: {
    _type: "geopoint"
    lat: number
    lng: number
  }
  photoUrl: string
  // title: string
  // location: {
  //   latitude: number | string
  //   longitude: number | string
  // }
  // inst?: string
  // gmapsLink?: string
  // markdown?: string
  categories: {
    _key: string
    _ref: string
    _type: "reference"
  }[]
}

export default IPlace
