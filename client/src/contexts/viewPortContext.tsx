import { createContext, useState, useEffect, ReactNode, useRef } from 'react';

export const ViewPortContext = createContext({ width: 0, height: 0 });

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
    const throttleInProgess = useRef<boolean>();
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleWindowResize = () => {
        if (throttleInProgess.current) return;

        throttleInProgess.current = true;

        setTimeout(() => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            throttleInProgess.current = false;
        }, 500);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return (
        <ViewPortContext.Provider value={{ width, height }}>
            {children}
        </ViewPortContext.Provider>
    );
};
