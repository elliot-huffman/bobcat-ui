'use client';

import { Badge, SearchBox } from '@fluentui/react-components';
import { AlertRegular, ChevronRightRegular } from '@fluentui/react-icons';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { useMockAppData } from '../../sdk/useMockAppData';
import type { MockAlert } from '../../sdk/mockAppData';
import { Prototype2FindingDrawer } from './Prototype2FindingDrawer';
import { METHOD_BADGE_COLOR, SEVERITY_BADGE_COLOR, SEVERITY_RANK } from './findingDetail';
import { usePrototype2FindingListStyles } from '../../styles/prototype2/Prototype2FindingList';

/** Prop contract for the prototype2 alerts screen. */
export interface Prototype2AlertsProps {
    /** Optional initial search query. */
    initialSearch?: string;
}

/** Alert row enriched with its owning repository's display name. */
interface AlertWithRepo extends MockAlert {
    repoName: string;
}

/**
 * Alerts screen listing every flagged endpoint across scanned repositories.
 * Clicking a row slides out the finding detail drawer from the end edge.
 * Mirrors the `#/app/alerts` route.
 * @param props Optional initial search value.
 * @returns Rendered alerts screen with finding drawer.
 */
export function Prototype2Alerts(props: Prototype2AlertsProps): ReactNode {
    const styles = usePrototype2FindingListStyles();
    const { repos, alerts } = useMockAppData();
    const [search, setSearch] = useState(props.initialSearch ?? '');
    const [selectedAlert, setSelectedAlert] = useState<AlertWithRepo | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const repoNameById = useMemo(() => {
        const map = new Map<string, string>();

        for (const repo of repos) {
            map.set(repo.id, repo.name);
        }

        return map;
    }, [repos]);

    const sortedAlerts = useMemo((): AlertWithRepo[] => {
        return [...alerts]
            .map((alert) => ({ ...alert, repoName: repoNameById.get(alert.repoId) ?? alert.repoId }))
            .sort((first, second) => SEVERITY_RANK[second.severity] - SEVERITY_RANK[first.severity]);
    }, [alerts, repoNameById]);

    const visibleAlerts = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return sortedAlerts;
        }

        return sortedAlerts.filter((alert) => {
            return `${ alert.endpoint } ${ alert.findingClass } ${ alert.title } ${ alert.repoName }`.toLowerCase().includes(query);
        });
    }, [search, sortedAlerts]);

    const scannedRepoCount = useMemo(() => repos.length, [repos]);

    const openAlert = (alert: AlertWithRepo): void => {
        setSelectedAlert(alert);
        setDrawerOpen(true);
    };

    const severityLabel = (alert: AlertWithRepo): string => alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1);

    return (
        <Layout className={ styles.root }>
                <Layout className={ styles.pageHeadText }>
                    <h2 className={ styles.pageTitle }>Alerts</h2>
                    <p className={ styles.pageSubtitle }>Every flagged endpoint across { scannedRepoCount } scanned repositories.</p>
                </Layout>

                <SearchBox
                    className={ styles.search }
                    contentBefore={ <AlertRegular /> }
                    placeholder="Search alerts by path, class…"
                    value={ search }
                    onChange={ (_event, data) => { setSearch(data.value); } }
                />

                {visibleAlerts.length === 0 ? (
                    <p className={ styles.emptyState }>No alerts matched your search.</p>
                ) : visibleAlerts.map((alert, index) => (
                    <button
                        key={ `${ alert.repoId }-${ alert.id }` }
                        type="button"
                        className={ index === visibleAlerts.length - 1 ? `${ styles.findRow } ${ styles.findRowLast }` : styles.findRow }
                        onClick={ () => { openAlert(alert); } }
                    >
                        <Badge className={ styles.methodTag } appearance="tint" color={ METHOD_BADGE_COLOR[alert.method] }>{ alert.method }</Badge>
                        <span className={ styles.findMid }>
                            <span className={ styles.findPath }>
                                { alert.endpoint }
                                <span className={ styles.findRepo }>· { alert.repoName }</span>
                            </span>
                            <span className={ styles.findTitle }>{ alert.findingClass } on { alert.method } { alert.endpoint }</span>
                        </span>
                        <Badge appearance="tint" color={ SEVERITY_BADGE_COLOR[alert.severity] }>{ severityLabel(alert) }</Badge>
                        <ChevronRightRegular className={ styles.chevron } />
                    </button>
                )) }

            <Prototype2FindingDrawer
                open={ drawerOpen }
                alert={ selectedAlert }
                repoName={ selectedAlert?.repoName }
                onClose={ () => { setDrawerOpen(false); } }
            />
        </Layout>
    );
}
