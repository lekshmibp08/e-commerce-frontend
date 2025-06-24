import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token")
  return isLoggedIn ? <Navigate to="/" replace /> : children
}

export function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token")
  return isLoggedIn ? children : <Navigate to="/login" replace />
}
