import * as actionTypes from "../actionTypes"

const initialState: RequestState = {
  requests: [],
  selected: ""
}

const requestsReducer = (
	state: RequestState = initialState,
	action: RequestAction
): RequestState => {
	switch (action.type) {
		case actionTypes.SELECT_REQUEST:
			return {
				...state,
				selected: action.request.uid,
			}
	}
	return state
}

export default requestsReducer
