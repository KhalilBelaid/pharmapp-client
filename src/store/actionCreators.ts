import * as actionTypes from "./actionTypes"

export function selectRequest(request: IRequest) {
	const action: RequestAction = {
		type: actionTypes.SELECT_REQUEST,
		request,
	}
	return (dispatch: DispatchType) => {
		dispatch(action)
	}
}
