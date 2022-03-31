import { createModel, RematchDispatch } from '@rematch/core'
import { RootModel } from '.'
import { loadRequests } from '../../common/api'
import { Request } from '../../common/types'

export type State = {
    selectedRequest : string | null
    queue : ReadonlyArray<Request>,
}

const requests = createModel<RootModel>()({
    state: {selectedRequest : null, queue: []} as State,
    reducers: {
        loaded: (state: State, payload: ReadonlyArray<Request>) => {
            return {
                selectedRequest : null,
                queue: payload
            }
        },
        unloaded: (state: State) => {
            return {
                selectedRequest : null,
                queue: []
            }
        },
        selected: (state: State, payload: string) =>  {
            return {
                selectedRequest : payload,
                queue : state.queue
            }
        }
    },
    effects: (dispatch: RematchDispatch<any>) => ({
        async load() {
            const requests =  await loadRequests()
            dispatch.requests.loaded(requests)
        }
    })
})

export default requests