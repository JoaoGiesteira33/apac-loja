import { ReactNode, createContext } from 'react';

export const CurrentAccountContext = createContext({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => {},
    tokenLevel: '',
    setTokenLevel: (tokenLevel: string) => {},
});

export const CurrentAccountProvider = ({
    loggedIn,
    setLoggedIn,
    tokenLevel,
    setTokenLevel,
    children,
}: {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    tokenLevel: string;
    setTokenLevel: (tokenLevel: string) => void;
    children: ReactNode;
}) => {
    return (
        <CurrentAccountContext.Provider
            value={{ loggedIn, setLoggedIn, tokenLevel, setTokenLevel }}>
            {children}
        </CurrentAccountContext.Provider>
    );
};
