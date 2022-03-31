export type Request = {
    id: string
    name: {
      first: string
      last: string
    }
    picture: {
      large: string
    }
    location: {
      street: string
      state: string
      city: string
      postcode: number
    }
    isFollowing: boolean
}

export type User = {
  uid: string,
  email: string | null
}