import { User } from "firebase/auth"

export type Request = {
  id: string
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: number
    coordinates: {
      latitude: number
      longitude: number
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email: string
  dob: {
    date: string
    age: number
  }
  phone: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

export type AppUser = 
  User & {
    roles : {
      pharmacy: boolean
    }
} 