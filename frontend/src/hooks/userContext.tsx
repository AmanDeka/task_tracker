// UserContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextProps {
    children: ReactNode;
}

interface User {
    id: string;
    username: string;
}

interface UserContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
