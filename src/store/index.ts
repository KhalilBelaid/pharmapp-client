import { init, RematchRootState, RematchDispatch } from '@rematch/core'
import auth from './models/auth'
import requests from './models/requests'

const models = {
    requests,
    auth
}

const store = init({
    models,
})

export default store
export type RootState = RematchRootState<typeof models>
export type RootDispatch = RematchDispatch<typeof models>