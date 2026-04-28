import type { ReactNode } from "react";
import { useAuthContext } from "./useAuthContext";
import { Navigate } from "react-router";

type Props = {
    children: ReactNode;
    requireAdmin?: boolean; // אם רוצים להגן על דפים של מנהל בלבד
}

const AuthGuard = ({ children, requireAdmin }: Props) => {
    const {isAuthorized, isInitialized, user } = useAuthContext();

    if (!isInitialized) {
        return <h1>Loading...</h1>;
    }

    if (!isAuthorized || !user) {
        return <Navigate to="/Login" />; // כאן פשוט hardcoded ל-login
    }

    if (requireAdmin && !user.isAdmin) {
        return <h1>Unauthorized</h1>; // משתמש לא מנהל
    }

    return <>{children}</>;
}

export default AuthGuard;