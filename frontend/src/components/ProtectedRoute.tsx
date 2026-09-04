import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const user =
    localStorage.getItem('docusaarthi-user')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute