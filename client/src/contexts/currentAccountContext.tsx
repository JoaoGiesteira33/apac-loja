import { ReactNode, createContext } from 'react';

export const CurrentAccountContext = createContext({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => {},
    tokenLevel: '',
});

export const CurrentAccountProvider = ({
    loggedIn,
    setLoggedIn,
    tokenLevel,
    children,
}: {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    tokenLevel: string;
    children: ReactNode;
}) => {
    return (
        <CurrentAccountContext.Provider
            value={{ loggedIn, setLoggedIn, tokenLevel }}>
            {children}
        </CurrentAccountContext.Provider>
    );
};
