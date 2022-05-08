import { useAuth } from "../contexts/AuthContext";
import Home from "./user/Home";

type PrivateRouteProps = {
  outlet: JSX.Element
}

export default function PrivateRoute({ outlet }: PrivateRouteProps) {
  const currentUser = useAuth()

  if (currentUser) {
    if (currentUser?.roles.pharmacy) return outlet
  }
    return <Home />
}