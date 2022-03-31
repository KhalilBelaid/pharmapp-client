import { Models } from '@rematch/core'
import requests from './requests'
import auth from './auth'

export interface RootModel extends Models<RootModel> {
	requests: typeof requests,
    auth: typeof auth
}

export const models: RootModel = { requests, auth }