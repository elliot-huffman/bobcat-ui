'use client';

import { Button, Card, Link, mergeClasses } from '@fluentui/react-components';
import { OpenRegular, SparkleRegular } from '@fluentui/react-icons';
import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { Layout } from '../LayoutSystem';
import { useMockAppData } from '../../sdk/useMockAppData';
import type { RepoSummary } from '../../sdk/mockAppData';
import { Prototype2SeverityCount } from './Prototype2SeverityLadder';
import { usePrototype2OverviewStyles } from '../../styles/prototype2/Prototype2Overview';

/** Prop contract for the prototype2 overview screen. */
export interface Prototype2OverviewProps {
    /** Invoked when a repository is opened from the activity or top-risk lists. */
    onOpenRepo?: (repoId: string) => void;
    /** Invoked when the user navigates to another section (e.g. alerts, repos). */
    onNavigate?: (page: 'alerts' | 'repos') => void;
    /** Invoked when the user starts a new scan. */
    onNewScan?: () => void;
    /** Invoked when the user opens repository configuration. */
    onConfigure?: () => void;
}

/** Risk score used to rank repositories on the overview (critical dominates). */
function repoRisk(repo: RepoSummary): number {
    return repo.critical * 1000 + repo.high * 10 + repo.medium;
}

/**
 * Additive overview screen for the Bobcat prototype2 application surface.
 * Mirrors the `#/app/overview` route: posture stats, a recent-activity feed, and a top-risk list.
 * @param props Navigation and action callbacks for the overview screen.
 * @returns Rendered overview screen.
 */
export function Prototype2Overview(props: Prototype2OverviewProps): ReactNode {
    const styles = usePrototype2OverviewStyles();
    const { repos, activity, totalCritical, totalHigh, totalEndpoints } = useMockAppData();

    const criticalRepoCount = useMemo(() => repos.filter((repo) => repo.critical > 0).length, [repos]);

    const stats = useMemo(() => {
        return [
            {
                id: 'critical',
                label: 'Open critical',
                value: totalCritical.toLocaleString(),
                hint: `across ${ criticalRepoCount } repositories`,
                valueClass: styles.statValueCritical
            },
            {
                id: 'high',
                label: 'Open high',
                value: totalHigh.toLocaleString(),
                hint: 'BOLA, IDOR, broken auth',
                valueClass: styles.statValueHigh
            },
            {
                id: 'endpoints',
                label: 'Endpoints tested',
                value: totalEndpoints.toLocaleString(),
                hint: `${ repos.length } of ${ repos.length } repos scanned`,
                valueClass: styles.statValueNeutral
            },
            {
                id: 'specs',
                label: 'Specs in sync',
                value: `${ repos.length }/${ repos.length }`,
                hint: '2 healing PRs open',
                valueClass: styles.statValuePositive
            }
        ];
    }, [criticalRepoCount, repos.length, styles, totalCritical, totalEndpoints, totalHigh]);

    const topRiskRepos = useMemo(() => {
        return [...repos].sort((first, second) => repoRisk(second) - repoRisk(first)).slice(0, 5);
    }, [repos]);

    const feedMarkerClassFor = (severity: 'critical' | 'high' | 'medium' | 'low'): string => {
        return severity === 'critical'
            ? styles.feedMarkerCritical
            : severity === 'high'
                ? styles.feedMarkerHigh
                : severity === 'medium'
                    ? styles.feedMarkerMedium
                    : styles.feedMarkerLow;
    };

    return (
        <Layout className={ styles.root }>
            <Layout className={ styles.pageHead }>
                <Layout className={ styles.pageHeadText }>
                    <h2 className={ styles.pageTitle }>Overview</h2>
                    <p className={ styles.pageSubtitle }>Posture across all repositories in elliot-huffman.</p>
                </Layout>
                <Layout className={ styles.pageActions }>
                    <Button appearance="outline" icon={ <OpenRegular /> } onClick={ props.onConfigure }>Configure repositories</Button>
                    <Button appearance="primary" icon={ <SparkleRegular /> } onClick={ props.onNewScan }>New scan</Button>
                </Layout>
            </Layout>

            <Layout className={ styles.statGrid }>
                {stats.map((stat) => (
                    <Card key={ stat.id } className={ styles.statCard }>
                        <span className={ styles.statLabel }>{ stat.label }</span>
                        <span className={ mergeClasses(styles.statValue, stat.valueClass) }>{ stat.value }</span>
                        <span className={ styles.statHint }>{ stat.hint }</span>
                    </Card>
                )) }
            </Layout>

            <Layout className={ styles.twoCol }>
                <Card className={ styles.panel }>
                    <Layout className={ styles.panelHead }>
                        <h3 className={ styles.panelTitle }>Recent activity</h3>
                        <Link onClick={ () => { props.onNavigate?.('alerts'); } }>View all alerts</Link>
                    </Layout>
                    {activity.map((item, index) => (
                        <button
                            key={ item.id }
                            type="button"
                            className={ mergeClasses(styles.feedRow, index === activity.length - 1 ? styles.feedRowLast : undefined) }
                            onClick={ () => { props.onOpenRepo?.(item.repoId); } }
                        >
                            <span className={ mergeClasses(styles.feedMarker, feedMarkerClassFor('high')) } />
                            <span className={ styles.feedText }>{ item.message }</span>
                            <span className={ styles.feedMeta }>{ item.at }</span>
                        </button>
                    )) }
                </Card>

                <Card className={ styles.panel }>
                    <Layout className={ styles.panelHead }>
                        <h3 className={ styles.panelTitle }>Top risk by repo</h3>
                        <Link onClick={ () => { props.onNavigate?.('repos'); } }>All repos</Link>
                    </Layout>
                    {topRiskRepos.map((repo, index) => (
                        <button
                            key={ repo.id }
                            type="button"
                            className={ mergeClasses(styles.feedRow, index === topRiskRepos.length - 1 ? styles.feedRowLast : undefined) }
                            onClick={ () => { props.onOpenRepo?.(repo.id); } }
                        >
                            <span className={ styles.riskName }>{ repo.name }</span>
                            <span>
                                <Prototype2SeverityCount severity="critical" count={ repo.critical } />
                            </span>
                            <span>
                                <Prototype2SeverityCount severity="high" count={ repo.high } />
                            </span>
                        </button>
                    )) }
                </Card>
            </Layout>
        </Layout>
    );
}
