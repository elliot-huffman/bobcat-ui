'use client';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type AnalysisScreenMode = 'scan' | 'detailed' | 'add-api';

interface AnalysisScreenState {
    mode: AnalysisScreenMode;
}

/** Default screen mode shown in the analysis workspace. */
const initialState: AnalysisScreenState = {
    mode: 'scan'
};

/** Slice that controls whether the scan or detailed analysis view is rendered. */
export const analysisScreenSlice = createSlice({
    initialState,
    name: 'Analysis Screen',
    reducers: {
        setAnalysisScreen: (state, action: PayloadAction<AnalysisScreenMode>): void => {
            state.mode = action.payload;
        }
    }
});

export function analysisScreenSelector(state: RootState): AnalysisScreenMode {
    return state.analysisScreen.mode;
}

/** Action creators exposed by the analysis screen slice. */
export const {
    setAnalysisScreen
} = analysisScreenSlice.actions;
