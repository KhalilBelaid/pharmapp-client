import { nanoid } from 'nanoid'
import { Request } from './types'

type RequestResponse = {
  results: ReadonlyArray<Request>
}

export const loadRequests = async () => {
  const result = await fetch('https://randomuser.me/api/?results=20')
  const data = await result.json() as RequestResponse
  return data.results.map(user => ({ ...user, id: nanoid() })) as ReadonlyArray<Request>
}