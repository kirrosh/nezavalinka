type IProject = {
  name: string
  // address?: string
  // fullAddress: string
  _id: string
  canHelp: string
  searchHelp: string
  description: any
  contacts: any
  type: "activist" | "project"
  location: {
    _type: "geopoint"
    lat: number
    lng: number
  }
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

export default IProject
