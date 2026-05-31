'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from './_components/elements/LayoutSystem';
import { HomeWizard } from './_components/elements/homeWizard/HomeWizard';
import { ReflexGrid } from './_components/elements/ReflexGrid';
import type { InputStepState } from './_components/elements/homeWizard/types';
import { mockAnalysisSdk, type AnalysisScanRecord } from './_components/sdk/mockAnalysisSdk';
import { useStyleList } from './_components/styles/pages/Home';
import { analysisScreenSelector, setAnalysisScreen } from '../store/components/elements/analysisScreen';
import { demoModeSelector } from '../store/components/elements/demoMode';

/**
 * Renders the main/home page of the application.
 * @returns Rendered main page for the application.
 */
export default function Page(): React.ReactNode {
    /** Compiled page-level style classes. */
    const computedStyles = useStyleList();
    /** Dispatch function used to update analysis screen mode. */
    const dispatch = useDispatch();
    /** Active analysis screen mode that selects scan versus detailed view. */
    const analysisScreen = useSelector(analysisScreenSelector);
    /** Global demo mode flag for mock processing behavior. */
    const demoMode = useSelector(demoModeSelector);
    /** Tracks whether the user has finished the wizard path. */
    const [wizardComplete, setWizardComplete] = useState(false);
    /** Loaded analysis rows that populate the analysis grid component. */
    const [analysisRows, setAnalysisRows] = useState<AnalysisScanRecord[]>([]);

    /** Builds the request payload passed into the mock scan SDK call. */
    const buildScanRequest = useCallback((input: InputStepState) => {
        return {
            demoMode,
            requestUrl: input.secondInput,
            storageLink: input.firstInput
        };
    }, [demoMode]);

    /** Creates one new analysis row from wizard input and appends it to existing grid rows. */
    const addAnalysisRow = useCallback(async (input: InputStepState): Promise<void> => {
        /** Request payload generated from the latest wizard input values. */
        const request = buildScanRequest(input);
        /** Mock response containing the newly created analysis row. */
        const response = await mockAnalysisSdk.createAnalysisScan(request);

        if (!response.created) {
            return;
        }

        setAnalysisRows((previous) => [response.created as AnalysisScanRecord, ...previous]);
    }, [buildScanRequest]);

    /** Handles wizard completion and triggers scan-row loading. */
    const handleWizardComplete = useCallback((inputState: InputStepState): void => {
        void addAnalysisRow(inputState);
        setWizardComplete(true);
        dispatch(setAnalysisScreen('scan'));
    }, [addAnalysisRow, dispatch]);

    /** Convenience flag indicating whether any analysis rows are available. */
    const hasAnalysisRows = useMemo(() => analysisRows.length > 0, [analysisRows]);
    /** Flag indicating whether user explicitly selected Add API mode from navigation. */
    const isAddApiScreen = useMemo(() => analysisScreen === 'add-api', [analysisScreen]);

    return (
        <Layout direction="column" gap="large" className={ computedStyles.root }>
            {demoMode ? (
                analysisScreen === 'detailed'
                    ? <ReflexGrid rows={ analysisRows } />
                    : isAddApiScreen
                        ? <HomeWizard onComplete={ handleWizardComplete } />
                    : wizardComplete
                        ? <ReflexGrid rows={ analysisRows } />
                        : <HomeWizard onComplete={ handleWizardComplete } />
            ) : (
                <>
                    {isAddApiScreen ? <HomeWizard onComplete={ handleWizardComplete } /> : null}
                    {hasAnalysisRows ? <ReflexGrid rows={ analysisRows } /> : <ReflexGrid />}
                </>
            )}
        </Layout>
    );
}
