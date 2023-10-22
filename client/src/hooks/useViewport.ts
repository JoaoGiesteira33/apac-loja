import React from 'react';
import { ViewPortContext } from '../contexts/viewPortContext';

export default function useViewport() {
    const { width, height } = React.useContext<{
        width: number;
        height: number;
    }>(ViewPortContext as React.Context<{ width: number; height: number }>);
    return { width, height };
}
