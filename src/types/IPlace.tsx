type IPlace = {
  address?: string
  fullAddress: string
  _id: string
  title: string
  location: {
    latitude: number | string
    longitude: number | string
  }
  inst?: string
  gmapsLink?: string
  markdown?: string
  tags: {
    _key: string
    _ref: string
    _type: "reference"
  }[]
}

export default IPlace
