'use client';

import { useMemo, useState } from 'react';
import type { ActivityItem, MockAlert, MockScan, RepoSummary } from './mockAppData';
import { MOCK_ACTIVITY, MOCK_ALERTS, MOCK_REPOS, MOCK_SCANS } from './mockAppData';

export interface AppData {
    repos: RepoSummary[];
    alerts: MockAlert[];
    scans: MockScan[];
    activity: ActivityItem[];
    alertsByRepoId: Map<string, MockAlert[]>;
    scanByRepoId: Map<string, MockScan>;
    totalAlerts: number;
    totalCritical: number;
    totalHigh: number;
    totalEndpoints: number;
}

/** Loads mock application data into state and exposes derived lookups for repos, alerts, and scans. */
export function useMockAppData(): AppData {
    const [repos] = useState<RepoSummary[]>(MOCK_REPOS);
    const [alerts] = useState<MockAlert[]>(MOCK_ALERTS);
    const [scans] = useState<MockScan[]>(MOCK_SCANS);
    const [activity] = useState<ActivityItem[]>(MOCK_ACTIVITY);

    /** Alerts grouped by repo ID for O(1) lookup in the alerts and spec detail screens. */
    const alertsByRepoId = useMemo(() => {
        const map = new Map<string, MockAlert[]>();

        for (const alert of alerts) {
            const existing = map.get(alert.repoId) ?? [];
            map.set(alert.repoId, [...existing, alert]);
        }

        return map;
    }, [alerts]);

    /** Most recent scan record per repo ID for O(1) lookup in the scans screen. */
    const scanByRepoId = useMemo(() => {
        const map = new Map<string, MockScan>();

        for (const scan of scans) {
            map.set(scan.repoId, scan);
        }

        return map;
    }, [scans]);

    const totalAlerts = useMemo(() => alerts.length, [alerts]);
    const totalCritical = useMemo(() => repos.reduce((sum, repo) => sum + repo.critical, 0), [repos]);
    const totalHigh = useMemo(() => repos.reduce((sum, repo) => sum + repo.high, 0), [repos]);
    const totalEndpoints = useMemo(() => repos.reduce((sum, repo) => sum + repo.endpoints, 0), [repos]);

    return {
        repos,
        alerts,
        scans,
        activity,
        alertsByRepoId,
        scanByRepoId,
        totalAlerts,
        totalCritical,
        totalHigh,
        totalEndpoints
    };
}
