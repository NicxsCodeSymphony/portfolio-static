"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface OverlayContextType {
    isOverlayOpen: boolean;
    setIsOverlayOpen: (open: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const useOverlay = () => {
    const context = useContext(OverlayContext);
    if (context === undefined) {
        throw new Error('useOverlay must be used within an OverlayProvider');
    }
    return context;
};

interface OverlayProviderProps {
    children: ReactNode;
}

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    return (
        <OverlayContext.Provider value={{ isOverlayOpen, setIsOverlayOpen }}>
            {children}
        </OverlayContext.Provider>
    );
}; 