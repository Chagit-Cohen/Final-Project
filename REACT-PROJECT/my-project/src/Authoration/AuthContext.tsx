import { createContext, useState, type ReactNode, useEffect } from "react";
import type { User } from "../Types/user";
import { getUserByToken } from "../Service/auth.service";
import { getSession, setSession } from "./Seesion";
import axios from "../Service/axios";

type AuthStateType = {
    user: User | null,
    isInitialized: boolean,
}

type AuthContextType = AuthStateType & {
    isAuthorized: boolean,
    setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

type Props = {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthStateType>({ user: null, isInitialized: false });

    const setUser = (user: User | null) => {
        setAuthState({ ...authState, user })
    }


    useEffect(() => {
        const initialize = async () => {
            const token = getSession()
            try {
                if (token) {
                    setSession(token);
                    const user = await getUserByToken();
                    setAuthState({ user, isInitialized: true });
                    return;
                }
            } catch (error) {
                console.error("Failed to restore session:", error);
                localStorage.removeItem("token");
                delete axios.defaults.headers.common.Authorization;
            }

            setAuthState({ user: null, isInitialized: true });






            // try {
            //     if (token) {
            //          setSession(token)
            //         const user = await getUserByToken()
            //         setUser(user)
            //     }
            // } catch (error) {
            //     console.error(error);
            // } finally {

            //     setAuthState((prev) => ({ ...prev, isInitialized: true }))
            // }
        }

        initialize();
    }, [])





    return <AuthContext.Provider value={{ ...authState, setUser, isAuthorized: !!authState.user }}>
        {children}
    </AuthContext.Provider>
}
















































// import { createContext, useState,useEffect, type ReactNode } from "react";
// import type { User } from "../Types/user";
// import {getSession} from "./Seesion"
// import { getUserByToken } from "../Service/auth.service";

// type AuthContextType = {
//   user: User | null;
//   setUser: (user: User | null) => void;
// };

// export const AuthContext = createContext<AuthContextType | null>(null);

// type Props = {
//   children: ReactNode;
// };

// export const AuthProvider = ({ children }: Props) => {
//   const [user, setUser] = useState<User | null>(null);




//    useEffect(() => {
//     const initializeUser = async () => {
//       const token = getSession();

//       if (!token) return;

//       try {
//         const userFromServer = await getUserByToken();
//         setUser(userFromServer);
//       }
//       catch (error) {
//         console.error("failed to restore user", error);
//       }
//     };

//     initializeUser();
//   }, []);





//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



































