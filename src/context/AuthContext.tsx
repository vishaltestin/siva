import { createContext, useContext, useEffect, useState } from "react";

type AuthUser = {
    email: string;
    collections: string[];
};

type AuthContextType = {
    user: AuthUser | null;
    loading: boolean;
    login: (data: AuthUser) => void;
    logout: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "broker_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const login = (data: AuthUser) => {
        setUser(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => useContext(AuthContext)!;
