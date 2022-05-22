import { useSelector } from "react-redux"
import { isEmpty, isLoaded } from "react-redux-firebase"
import { RootState } from "../../store/reducers"
import RequestForm from "../user/RequestForm"
// import "firebase/compat/auth"

type props = {
	outlet: JSX.Element
}

export default function PrivateRoute({ outlet }: props) {
	const auth = useSelector((state: RootState) => state.firebase.auth)
	const profile = useSelector((state: RootState) => state.firebase.profile)
	if (isLoaded(auth) && !isEmpty(auth)) {
		if (profile.role) return outlet
	}
	return <RequestForm />
}
