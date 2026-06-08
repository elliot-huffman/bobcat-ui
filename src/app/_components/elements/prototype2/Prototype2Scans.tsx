'use client';

import { Button } from '@fluentui/react-components';
import { ChevronRightRegular, SparkleRegular } from '@fluentui/react-icons';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { useMockAppData } from '../../sdk/useMockAppData';
import type { MockAlert, RepoSummary } from '../../sdk/mockAppData';
import { Prototype2FindingDrawer } from './Prototype2FindingDrawer';
import { SEVERITY_RANK } from './findingDetail';
import { usePrototype2FindingListStyles } from '../../styles/prototype2/Prototype2FindingList';

/** Prop contract for the prototype2 scans screen. */
export interface Prototype2ScansProps {
    /** Invoked when the user starts a new scan. */
    onNewScan?: () => void;
}

/** Alert row enriched with its owning repository's display name. */
interface AlertWithRepo extends MockAlert {
    repoName: string;
}

/**
 * Scans screen showing the latest run per repository.
 * Selecting a scan opens the repository's highest-severity finding in the slide-out drawer.
 * Mirrors the `#/app/scans` route.
 * @param props New-scan callback.
 * @returns Rendered scans screen with finding drawer.
 */
export function Prototype2Scans(props: Prototype2ScansProps): ReactNode {
    const styles = usePrototype2FindingListStyles();
    const { repos, alerts, scanByRepoId, alertsByRepoId } = useMockAppData();
    const [selectedAlert, setSelectedAlert] = useState<AlertWithRepo | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const findingCountByRepoId = useMemo(() => {
        const map = new Map<string, number>();

        for (const alert of alerts) {
            map.set(alert.repoId, (map.get(alert.repoId) ?? 0) + 1);
        }

        return map;
    }, [alerts]);

    const scanMarkerClassFor = (repo: RepoSummary): string => {
        if (repo.critical > 0) {
            return styles.scanMarkerCritical;
        }

        if (repo.high > 0) {
            return styles.scanMarkerHigh;
        }

        return styles.scanMarkerClean;
    };

    const openTopFinding = (repo: RepoSummary): void => {
        const repoAlerts = alertsByRepoId.get(repo.id) ?? [];

        if (repoAlerts.length === 0) {
            return;
        }

        const topAlert = [...repoAlerts].sort((first, second) => SEVERITY_RANK[second.severity] - SEVERITY_RANK[first.severity])[0]!;
        setSelectedAlert({ ...topAlert, repoName: repo.name });
        setDrawerOpen(true);
    };

    return (
        <Layout className={ styles.root }>
            <Layout className={ styles.pageHead }>
                <Layout className={ styles.pageHeadText }>
                    <h2 className={ styles.pageTitle }>Scans</h2>
                    <p className={ styles.pageSubtitle }>Bobcat runs on every push. Latest run per repository.</p>
                </Layout>
                <Layout className={ styles.pageActions }>
                    <Button appearance="primary" icon={ <SparkleRegular /> } onClick={ props.onNewScan }>New scan</Button>
                </Layout>
            </Layout>

            <Layout className={ styles.findList }>
                {repos.map((repo, index) => {
                    const scan = scanByRepoId.get(repo.id);
                    const findingCount = findingCountByRepoId.get(repo.id) ?? 0;

                    return (
                        <button
                            key={ repo.id }
                            type="button"
                            className={ index === repos.length - 1 ? `${ styles.findRow } ${ styles.findRowLast }` : styles.findRow }
                            onClick={ () => { openTopFinding(repo); } }
                        >
                            <span className={ `${ styles.scanMarker } ${ scanMarkerClassFor(repo) }` } />
                            <span className={ styles.findMid }>
                                <span className={ styles.scanName }>{ repo.name }</span>
                                <span className={ styles.findTitle }>{ repo.endpoints.toLocaleString() } endpoints · { findingCount } findings · spec { repo.spec }</span>
                            </span>
                            <span className={ styles.findLocation }>{ scan?.completedAt ?? repo.scanned }</span>
                            <ChevronRightRegular className={ styles.chevron } />
                        </button>
                    );
                }) }
            </Layout>

            <Prototype2FindingDrawer
                open={ drawerOpen }
                alert={ selectedAlert }
                repoName={ selectedAlert?.repoName }
                onClose={ () => { setDrawerOpen(false); } }
            />
        </Layout>
    );
}
