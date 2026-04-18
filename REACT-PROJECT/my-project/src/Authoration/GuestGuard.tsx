import type { ReactNode } from "react"
import { useAuthContext } from "./useAuthContext"
import { Navigate } from "react-router"

type Props = {
    children: ReactNode;
}

const GuestGuard = ({ children }: Props) => {
    const { isAuthorized, isInitialized } = useAuthContext();

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    if (isAuthorized) {
        return <Navigate to={`/`} />
    }

    return <>{children}</>
}

export default GuestGuard
