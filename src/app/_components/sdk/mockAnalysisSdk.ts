'use client';

export interface AnalysisScanRequest {
    demoMode: boolean;
    requestUrl: string;
    storageLink: string;
}

export interface AnalysisScanRecord {
    customer: string;
    id: string;
    region: string;
    status: string;
}

export interface DetailedAnalysisRecord {
    eventType: string;
    id: string;
    parentId: string;
    state: string;
}

/** Single analysis row returned from the add-analysis wizard flow. */
export interface CreateAnalysisResponse {
    created: AnalysisScanRecord | null;
}

/** Seed scan rows returned by the mock scan endpoint. */
const scanSeedRecords: AnalysisScanRecord[] = [
    { id: 'b6ad946e-8a8f-4b73-b17f-3f5279f8e9e7', customer: 'Northwind Traders', region: 'North America', status: 'Pending' },
    { id: 'b30f8812-b0b4-4d7f-aebf-a8a6ff760f0f', customer: 'Fabrikam Retail', region: 'Europe', status: 'Pending' },
    { id: '1d8570f9-c6aa-49e2-8d87-2a670932f089', customer: 'Contoso Labs', region: 'Asia Pacific', status: 'Pending' }
];

/** Ordered event types used to shape detailed analysis records. */
const eventTypes = ['Validation', 'Ingestion', 'Indexing'];
/** Ordered workflow states paired with each generated detail event. */
const states = ['Complete', 'Queued', 'Pending'];

/** Mock SDK surface that mirrors future analysis API calls. */
export const mockAnalysisSdk = {
    getAnalysisScans: async (request: AnalysisScanRequest): Promise<AnalysisScanRecord[]> => {
        if (!request.demoMode) {
            return [];
        }

        /** Derived storage text injected into mock customer labels. */
        const storageLabel = request.storageLink.trim().length > 0 ? request.storageLink.trim() : 'No storage link provided';
        /** Derived region text injected into the first mock row. */
        const requestRegion = request.requestUrl.trim().length > 0 ? request.requestUrl.trim() : 'Unspecified request URL';

        return scanSeedRecords.map((row, index) => {
            return {
                ...row,
                customer: `${row.customer} | ${storageLabel}`,
                region: index === 0 ? requestRegion : row.region,
                status: index === 0 ? 'Active' : row.status
            };
        });
    },

    getDetailedAnalysisByScanId: async (scanId: string): Promise<DetailedAnalysisRecord[]> => {
        return eventTypes.map((eventType, index) => {
            return {
                eventType,
                id: `${scanId}-${index + 1}`,
                parentId: scanId,
                state: states[index] ?? 'Pending'
            };
        });
    },

    createAnalysisScan: async (request: AnalysisScanRequest): Promise<CreateAnalysisResponse> => {
        /** Candidate rows generated from the same mock scan transformation chain. */
        const candidates = await mockAnalysisSdk.getAnalysisScans(request);
        /** Source row used as a template for the newly added scan item. */
        const source = candidates[0];

        if (!source) {
            return { created: null };
        }

        return {
            created: {
                ...source,
                id: crypto.randomUUID(),
                status: 'Active'
            }
        };
    }
};
