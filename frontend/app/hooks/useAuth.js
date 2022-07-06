import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState()
    const session = useSession()

    useEffect(() => {
        if (session) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [session])
    
    return {
        isAuthenticated,
    }
}