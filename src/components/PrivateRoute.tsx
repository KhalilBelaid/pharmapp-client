import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

type PrivateRouteProps = {
  outlet: JSX.Element
}

export default function PrivateRoute({ outlet }: PrivateRouteProps) {
  const currentUser = useAuth()

  if (currentUser) {
    return outlet
  } else {
    return <Navigate to="/signin" />
  }
}