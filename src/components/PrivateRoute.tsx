import { Navigate } from "react-router-dom"

export type ProtectedRouteProps = {
  cond: boolean;
  outlet: JSX.Element;
};

export default function PrivateRoute({cond, outlet}: ProtectedRouteProps) { 
  return cond ? outlet : <Navigate to="/" />
}