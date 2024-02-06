// UserContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';
import { User } from '../utils/customTypes';

interface UserContextProps {
    children: ReactNode;
}



interface UserContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Use a random value as the key to trigger a re-render

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
