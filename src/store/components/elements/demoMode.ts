'use client';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface DemoModeState {
    demoMode: boolean;
}

const initialState: DemoModeState = {
    demoMode: true
};

export const demoModeSlice = createSlice({
    initialState,
    name: 'Demo Mode',
    reducers: {
        setDemoMode: (state, action: PayloadAction<DemoModeState['demoMode']>): void => { state.demoMode = action.payload; },
        toggleDemoMode: (state): void => { state.demoMode = !state.demoMode; }
    }
});

export function demoModeSelector(state: RootState): DemoModeState['demoMode'] {
    return state.demoMode.demoMode;
}

export const {
    setDemoMode,
    toggleDemoMode
} = demoModeSlice.actions;
